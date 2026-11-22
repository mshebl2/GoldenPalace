const http = require('http');

const routes = [
  '/',
  '/about',
  '/services',
  '/services/interior-paint',
  '/services/exterior-paint',
  '/services/wall-decor',
  '/services/ceiling-paint',
  '/services/door-paint',
  '/services/facades-finishing',
  '/offers',
  '/portfolio',
  '/blog',
  '/blog/ceiling-paint-guide',
  '/blog/modern-wall-decor-ideas',
  '/blog/best-paint-colors-guide',
  '/contact',
  '/privacy',
  '/sitemap.xml',
  '/robots.txt',
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          route,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length,
          containsBrand: data.includes('القصر الذهبي'),
          containsPhone: data.includes('0561095505') || data.includes('056 109 5505'),
        });
      });
    }).on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

async function runAll() {
  console.log('Testing all website routes against production server on http://localhost:3000 ...\n');
  const results = [];
  let allPass = true;

  for (const r of routes) {
    const res = await checkRoute(r);
    results.push(res);
    const pass = res.statusCode === 200;
    if (!pass) allPass = false;

    console.log(
      `${pass ? '✅ PASS' : '❌ FAIL'} [${res.statusCode || 'ERR'}] ${r.padEnd(35)} (Length: ${res.length || 0} bytes)`
    );
  }

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log(`Total Routes Checked: ${results.length}`);
  console.log(`All Routes Returning 200 OK: ${allPass ? 'YES' : 'NO'}`);

  if (!allPass) {
    process.exit(1);
  }
}

runAll();
