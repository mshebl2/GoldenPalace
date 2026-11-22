const fs = require('fs');

const dbPath = 'c:\\دهانات\\data\\db.json';
let dbText = fs.readFileSync(dbPath, 'utf8');

const replacements = [
  ['0530200529', '0561095508'],
  ['966530200529', '966561095508'],
  ['0561095505', '0561095508'],
  ['966561095505', '966561095508'],
  ['info@eleganteast.com', 'info@alqasraldhahabi.com'],
  ['admin@eleganteast.com', 'admin@alqasraldhahabi.com'],
  ['www.eleganteast.com', 'www.alqasraldhahabi.com'],
  ['eleganteast.com', 'alqasraldhahabi.com'],
  ['شركة أبراج الشرق الأنيق المحدودة', 'القصر الذهبي للدهانات والديكورات الحديثة'],
  ['شركة أبراج الشرق الأنيق', 'القصر الذهبي للدهانات والديكورات الحديثة'],
  ['أبراج الشرق الأنيق', 'القصر الذهبي للدهانات والديكورات الحديثة'],
  ['أبراج الشرق', 'القصر الذهبي'],
  ['الرياض - طريق الخرج - حي المناخ', 'المنطقة الشرقية (الخبر • الدمام • القطيف)'],
  ['الرياض - طريق الخرج', 'المنطقة الشرقية (الخبر • الدمام • القطيف)'],
  ['طريق الخرج، حي المناخ', 'المنطقة الشرقية'],
  ['منطقة الرياض', 'المنطقة الشرقية'],
  ['حي المناخ بالرياض', 'المنطقة الشرقية'],
  ['بالرياض', 'بالمنطقة الشرقية (الخبر والدمام والقطيف)'],
  ['في الرياض', 'في المنطقة الشرقية (الخبر والدمام والقطيف)'],
  ['الرياض', 'المنطقة الشرقية'],
  ['/images/factory/hero-luxury-dining.jpg', '/images/hero/hero-living-room.webp'],
  ['/brand/logos/logo-emblem-gold.png', '/images/brand/emblem.png'],
  ['/images/brand/logo.png', '/images/brand/golden-palace-logo.png']
];

for (const [from, to] of replacements) {
  let count = 0;
  while (dbText.includes(from)) {
    dbText = dbText.replace(from, to);
    count++;
  }
  if (count > 0) {
    console.log(`Replaced "${from}" -> "${to}" (${count} times)`);
  }
}

// Verify JSON validity
try {
  const parsed = JSON.parse(dbText);
  // Ensure admin user exists with right email
  if (parsed.users) {
    parsed.users = parsed.users.map(u => {
      if (u.email.includes('eleganteast')) {
        u.email = 'admin@alqasraldhahabi.com';
        u.name = 'المشرف العام - القصر الذهبي';
      }
      return u;
    });
  }
  // Ensure machinery is replaced or empty
  if (parsed.machinery) {
    parsed.machinery = [
      {
        id: 'equipment-airless-sprayer',
        titleAr: 'ماكينات الرش الهوائي Airless الحديثة',
        titleEn: 'Modern Airless Paint Sprayer',
        badgeAr: 'معدات متطورة',
        badgeEn: 'Advanced Equipment',
        descAr: 'ماكينات رش حديثة تضمن توزيع متجانس ومثالي للدهانات دون أي أثر لخطوط الرولة.',
        descEn: 'High-performance airless sprayers ensuring even and flawless paint application.',
        image: '/images/offers/paint-tools.webp',
        featuresAr: ['توزيع متجانس للدهان', 'سرعة إنجاز المساحات الكبيرة', 'تشطيب فندقي ناعم'],
        featuresEn: ['Uniform paint distribution', 'High execution speed', 'Silk-smooth finish'],
        order: 1
      },
      {
        id: 'equipment-orbital-sander',
        titleAr: 'أجهزة الصنفرة المكانيكية المفرغة من الغبار',
        titleEn: 'Dustless Orbital Wall Sanders',
        badgeAr: 'بيئة عمل نظيفة',
        badgeEn: 'Clean Work Environment',
        descAr: 'أجهزة صنفرة احترافية مزودة بنظام شفط آلي للغبار لحماية أثاث المنزل أثناء العمل.',
        descEn: 'Professional wall sanders with integrated vacuum extraction for clean living spaces.',
        image: '/images/offers/paint-tools.webp',
        featuresAr: ['شفط 99% من غبار المعجون', 'استواء تام للجدران', 'حماية الأثاث والمفروشات'],
        featuresEn: ['99% dust vacuum extraction', 'Flawless wall leveling', 'Complete furniture protection'],
        order: 2
      }
    ];
  }
  fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf8');
  console.log('db.json successfully sanitized and saved!');
} catch (e) {
  console.error('Failed to parse dbText as JSON:', e);
}
