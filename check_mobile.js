const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9555',
  '--window-size=390,844',
  'http://localhost:3000'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9555/json', (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
      try {
        const targets = JSON.parse(body);
        const target = targets.find(t => t.type === 'page');
        if (!target) { chrome.kill(); return; }
        const ws = new WebSocket(target.webSocketDebuggerUrl);
        ws.onopen = () => {
          const expr = `
            (() => {
              const res = [];
              document.querySelectorAll('*').forEach(el => {
                if (el.scrollWidth > 390) {
                  res.push({
                    tag: el.tagName,
                    id: el.id,
                    cls: (el.className || '').toString().slice(0, 40),
                    scrollWidth: el.scrollWidth,
                    clientWidth: el.clientWidth
                  });
                }
              });
              return JSON.stringify(res.slice(0, 15));
            })()
          `;
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: { expression: expr, returnByValue: true }
          }));
        };
        ws.onmessage = (e) => {
          const m = JSON.parse(e.data);
          if (m.id === 1) {
            console.log('OVERFLOW ELEMENTS:', m.params?.result?.value);
            ws.close();
            chrome.kill();
            process.exit(0);
          }
        };
      } catch (err) {
        console.error(err);
        chrome.kill();
      }
    });
  });
}, 2000);
