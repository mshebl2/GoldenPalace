const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9444',
  '--window-size=390,844',
  'http://localhost:3000'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9444/json', (res) => {
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
              const wide = [];
              document.querySelectorAll('*').forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.width > 390 || r.right > 390) {
                  wide.push({
                    tag: el.tagName,
                    cls: (el.className || '').toString().substring(0, 50),
                    width: Math.round(r.width),
                    right: Math.round(r.right),
                    left: Math.round(r.left)
                  });
                }
              });
              return JSON.stringify(wide);
            })()
          `;
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: { expression: expr }
          }));
        };
        ws.onmessage = (e) => {
          const m = JSON.parse(e.data);
          if (m.id === 1) {
            console.log('WIDE ELEMENTS:', m.params?.result?.value);
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
