const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9680',
  '--window-size=1440,1200',
  'about:blank'
]);

const pages = [
  { url: 'http://localhost:3000/products', out: 'products_distinct_photos.png' },
  { url: 'http://localhost:3000/projects', out: 'projects_diverse_gallery.png' }
];

let curIdx = 0;

setTimeout(() => {
  http.get('http://127.0.0.1:9680/json', (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
      const targets = JSON.parse(body);
      const target = targets.find(t => t.type === 'page');
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      function navigateNext() {
        if (curIdx >= pages.length) {
          console.log('ALL VIEWS CAPTURED!');
          ws.close();
          chrome.kill();
          process.exit(0);
          return;
        }
        const p = pages[curIdx];
        ws.send(JSON.stringify({ id: 100 + curIdx, method: 'Page.navigate', params: { url: p.url } }));
      }

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        navigateNext();
      };

      ws.onmessage = (e) => {
        const m = JSON.parse(e.data);
        if (m.method === 'Page.loadEventFired') {
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 200 + curIdx,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 1800);
        }

        if (m.id && m.id >= 200 && m.id < 300) {
          const p = pages[curIdx];
          const dest = path.join('C:', 'Users', 'mradd', '.gemini', 'antigravity', 'brain', '142af455-20c7-4c60-a3c9-bdf519fb3992', p.out);
          fs.writeFileSync(dest, Buffer.from(m.result.data, 'base64'));
          console.log('Saved', p.out);
          curIdx++;
          setTimeout(navigateNext, 500);
        }
      };
    });
  });
}, 1500);
