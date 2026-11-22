const { execSync } = require('child_process');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const pages = [
  { url: 'http://localhost:3000/', out: 'C:\\Users\\mradd\\.gemini\\antigravity\\brain\\142af455-20c7-4c60-a3c9-bdf519fb3992\\final_home_view.png', delay: 2000 },
  { url: 'http://localhost:3000/products', out: 'C:\\Users\\mradd\\.gemini\\antigravity\\brain\\142af455-20c7-4c60-a3c9-bdf519fb3992\\final_products_view.png', delay: 2500 },
  { url: 'http://localhost:3000/projects', out: 'C:\\Users\\mradd\\.gemini\\antigravity\\brain\\142af455-20c7-4c60-a3c9-bdf519fb3992\\final_projects_view.png', delay: 2500 },
  { url: 'http://localhost:3000/quotation', out: 'C:\\Users\\mradd\\.gemini\\antigravity\\brain\\142af455-20c7-4c60-a3c9-bdf519fb3992\\final_quotation_view.png', delay: 2000 }
];
pages.forEach(p => {
  try {
    const cmd = `"${chrome}" --headless --disable-gpu --window-size=1400,1600 --screenshot="${p.out}" --virtual-time-budget=${p.delay} "${p.url}"`;
    execSync(cmd);
    console.log('Captured successfully:', p.out);
  } catch (err) {
    console.error('Error capturing', p.url, err.message);
  }
});
