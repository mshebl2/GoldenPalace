const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9333',
  'about:blank'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9333/json', (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
      try {
        const targets = JSON.parse(body);
        const target = targets.find(t => t.type === 'page');
        const ws = new WebSocket(target.webSocketDebuggerUrl);
        ws.onopen = () => {
          ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
          ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
          ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
          ws.send(JSON.stringify({ id: 4, method: 'Page.navigate', params: { url: 'http://localhost:3000' } }));
        };
        ws.onmessage = (e) => {
          const m = JSON.parse(e.data);
          if (m.method === 'Runtime.consoleAPICalled') {
            console.log('CONSOLE [' + m.params.type + ']:', m.params.args.map(a => a.value || a.description).join(' '));
          }
          if (m.method === 'Runtime.exceptionThrown') {
            console.log('EXCEPTION:', m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
          }
        };
        setTimeout(() => {
          ws.close();
          chrome.kill();
          process.exit(0);
        }, 4000);
      } catch (err) {
        console.error(err);
        chrome.kill();
      }
    });
  }).on('error', err => {
    console.error('HTTP err:', err);
    chrome.kill();
  });
}, 1500);
