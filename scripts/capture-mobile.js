const { execSync } = require('child_process');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const pages = [
  { url: 'http://localhost:3000/products', out: 'C:\\Users\\mradd\\.gemini\\antigravity\\brain\\142af455-20c7-4c60-a3c9-bdf519fb3992\\final_mobile_products.png' },
  { url: 'http://localhost:3000/quotation', out: 'C:\\Users\\mradd\\.gemini\\antigravity\\brain\\142af455-20c7-4c60-a3c9-bdf519fb3992\\final_mobile_quotation.png' }
];
pages.forEach(p => {
  try {
    const cmd = `"${chrome}" --headless --disable-gpu --window-size=390,844 --screenshot="${p.out}" --virtual-time-budget=2000 "${p.url}"`;
    execSync(cmd);
    console.log('Mobile captured:', p.out);
  } catch (e) {
    console.error(e);
  }
});
