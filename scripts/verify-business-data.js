const http = require('http');

function fetchContent(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    });
  });
}

async function verifyBusinessRules() {
  console.log('Running business rules & data assertions...\n');
  const homeHtml = await fetchContent('/');
  const offersHtml = await fetchContent('/offers');

  const assertions = [
    {
      name: 'Homepage contains official brand name "القصر الذهبي"',
      pass: homeHtml.includes('القصر الذهبي'),
    },
    {
      name: 'Homepage contains subtitle "للدهانات والديكورات الحديثة"',
      pass: homeHtml.includes('للدهانات والديكورات الحديثة'),
    },
    {
      name: 'Homepage contains official phone (0561095508 / 0561095505)',
      pass:
        homeHtml.includes('0561095508') ||
        homeHtml.includes('056 109 5508') ||
        homeHtml.includes('0561095505') ||
        homeHtml.includes('056 109 5505'),
    },
    {
      name: 'Homepage contains service cities: الخبر، الدمام، القطيف',
      pass: homeHtml.includes('الخبر') && homeHtml.includes('الدمام') && homeHtml.includes('القطيف'),
    },
    {
      name: 'Offers: 1 Room price 500 (old 700)',
      pass: offersHtml.includes('500') && offersHtml.includes('700'),
    },
    {
      name: 'Offers: 2 Rooms price 700 (old 1000)',
      pass: offersHtml.includes('700') && offersHtml.includes('1000') || offersHtml.includes('1,000'),
    },
    {
      name: 'Offers: 3 Rooms price 1000 (old 1300)',
      pass: (offersHtml.includes('1000') || offersHtml.includes('1,000')) && (offersHtml.includes('1300') || offersHtml.includes('1,300')),
    },
    {
      name: 'Offers: Ceiling price 100',
      pass: offersHtml.includes('100'),
    },
    {
      name: 'Offers: Door price 90',
      pass: offersHtml.includes('90'),
    },
    {
      name: 'Offers include 5 certified items',
      pass:
        offersHtml.includes('معالجة أركان الجدران بالمعجون') &&
        offersHtml.includes('وجه سنفرة') &&
        offersHtml.includes('وجه أساس') &&
        offersHtml.includes('وجهين تشطيب') &&
        offersHtml.includes('مع نظافة مكان العمل'),
    },
    {
      name: 'Paint brand JOTUN is featured',
      pass: offersHtml.includes('JOTUN') && offersHtml.includes('جوتن'),
    },
    {
      name: 'Direct international WhatsApp links present',
      pass: offersHtml.includes('966561095508') || offersHtml.includes('966561095505') || offersHtml.includes('wa.me'),
    },
  ];

  let failedCount = 0;
  for (const a of assertions) {
    if (a.pass) {
      console.log(`✅ [ASSERTION PASS] ${a.name}`);
    } else {
      console.log(`❌ [ASSERTION FAIL] ${a.name}`);
      failedCount++;
    }
  }

  console.log(`\nTotal Assertions: ${assertions.length}`);
  console.log(`Failures: ${failedCount}`);

  if (failedCount > 0) {
    process.exit(1);
  } else {
    console.log('\n🎉 ALL BUSINESS RULES AND DATA ASSERTIONS VERIFIED 100%!');
  }
}

verifyBusinessRules();
