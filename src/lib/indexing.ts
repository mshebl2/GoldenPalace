import { revalidatePath } from 'next/cache';

export const SITE_DOMAIN = 'https://www.alqasraldhahabi.com';
export const SITEMAP_URL = `${SITE_DOMAIN}/sitemap.xml`;

/**
 * Triggers automatic instant re-indexing and cache revalidation across search engines:
 * 1. Revalidates Next.js cached pages and dynamic sitemap.
 * 2. Pings Google sitemap ping endpoint.
 * 3. Submits updated URLs to IndexNow (Bing, Yandex, Naver).
 */
export async function triggerAutoReindex(paths: string[] = ['/', '/sitemap.xml']) {
  // 1. Instant Next.js Cache Revalidation
  try {
    revalidatePath('/sitemap.xml');
    revalidatePath('/robots.txt');
    for (const p of paths) {
      revalidatePath(p);
    }
  } catch (err) {
    console.warn('Next.js revalidatePath warning:', err);
  }

  // 2. Run asynchronous search engine pings without blocking caller
  (async () => {
    try {
      // Ping Google with updated sitemap
      const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
      fetch(googlePingUrl, { method: 'GET' }).catch(() => {});

      // Ping Bing / IndexNow
      const fullUrls = paths.map((p) => (p.startsWith('http') ? p : `${SITE_DOMAIN}${p.startsWith('/') ? '' : '/'}${p}`));
      if (!fullUrls.includes(SITEMAP_URL)) fullUrls.push(SITEMAP_URL);

      fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: 'www.alqasraldhahabi.com',
          key: 'alqasraldhahabi2026indexnow',
          keyLocation: `${SITE_DOMAIN}/alqasraldhahabi2026indexnow.txt`,
          urlList: fullUrls,
        }),
      }).catch(() => {});
    } catch {
      // Non-fatal
    }
  })();
}
