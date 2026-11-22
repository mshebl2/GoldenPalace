import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/layout/LanguageContext';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { FloatingContactWidget } from '@/components/common/FloatingContactWidget';
import { getSEOSettings } from '@/lib/db';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOSettings();
  const canonicalUrl = 'https://www.alqasraldhahabi.com';
  const businessName = 'القصر الذهبي للدهانات والديكورات الحديثة';
  const metaTitle = 'القصر الذهبي للدهانات والديكورات الحديثة | دهانات جوتن وديكورات بالشرقية (الدمام - الخبر - القطيف)';
  const metaDesc = 'شركة القصر الذهبي للدهانات والديكورات الحديثة بالمنطقة الشرقية. أفضل عروض دهانات جوتن الأصلية، ديكورات بديل الرخام والخشب، بانوهات فوم، دهان أبواب وأسقف بالدمام والخبر والقطيف.';

  return {
    title: {
      default: metaTitle,
      template: `%s | ${businessName}`,
    },
    description: metaDesc,
    keywords: seo.keywords || [
      'دهانات الخبر',
      'دهانات الدمام',
      'دهانات القطيف',
      'صباغ بالدمام',
      'صباغ بالخبر',
      'معلم دهانات الشرقية',
      'ديكورات بديل الرخام',
      'بديل الخشب',
      'بانوهات فوم',
      'دهانات جوتن',
      'عروض دهانات',
      'تشطيب شقق وفلل',
      'القصر الذهبي للدهانات'
    ],
    authors: [{ name: businessName }],
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: seo.robotsIndexing ?? true,
      follow: seo.robotsIndexing ?? true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seo.ogTitle || metaTitle,
      description: seo.ogDescription || metaDesc,
      url: canonicalUrl,
      siteName: businessName,
      images: [
        {
          url: seo.ogImage || '/images/hero/hero-living-room.webp',
          width: 1200,
          height: 630,
          alt: businessName,
        },
      ],
      locale: 'ar_SA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle || metaTitle,
      description: seo.ogDescription || metaDesc,
      images: [seo.ogImage || '/images/hero/hero-living-room.webp'],
    },
    verification: {
      google: seo.googleSiteVerification || '',
    },
    icons: {
      icon: '/images/brand/emblem.png',
      apple: '/images/brand/emblem.png',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getSEOSettings();
  const googleVerification = seo.googleSiteVerification || '';
  const siteUrl = 'https://www.alqasraldhahabi.com';

  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/brand/emblem.png" />
        {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
        {/* Performance Preloads & Hints */}
        <link
          rel="preload"
          href="/brand/fonts/MadaniArabic-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/images/hero/hero-living-room.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: seo.businessNameAr || 'القصر الذهبي للدهانات والديكورات الحديثة',
                alternateName: seo.businessNameEn || 'Golden Palace for Modern Paints & Decors',
                url: siteUrl,
                potentialAction: {
                  '@type': 'SearchAction',
                  target: `${siteUrl}/services?q={search_term_string}`,
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
                name: seo.businessNameAr || 'القصر الذهبي للدهانات والديكورات الحديثة',
                alternateName: seo.businessNameEn || 'Golden Palace for Modern Paints & Decors',
                description: seo.metaDescriptionAr || 'شركة دهانات وديكورات بالمنطقة الشرقية: دهانات داخلية وخارجية، عروض غرف جوتن، بديل الرخام، بديل الخشب، فوم وأسقف وأبواب بالخبر والدمام والقطيف.',
                url: siteUrl,
                logo: `${siteUrl}/images/brand/golden-palace-logo.png`,
                image: [
                  `${siteUrl}/images/hero/hero-living-room.webp`,
                  `${siteUrl}/images/brand/golden-palace-logo.png`,
                ],
                telephone: seo.phone || '0561095508',
                email: 'info@alqasraldhahabi.com',
                priceRange: '$$',
                currenciesAccepted: 'SAR',
                paymentAccepted: 'Cash, Credit Card, Bank Transfer, Mada, Apple Pay',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: seo.streetAddress || 'المنطقة الشرقية',
                  addressLocality: 'الخبر',
                  addressRegion: 'المنطقة الشرقية',
                  postalCode: '31952',
                  addressCountry: 'SA',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 26.2172,
                  longitude: 50.1971,
                },
                hasMap: seo.googleMapsUrl || 'https://maps.google.com',
                openingHoursSpecification: [
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                      'Sunday',
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Saturday',
                    ],
                    opens: '08:00',
                    closes: '22:00',
                  },
                ],
                areaServed: [
                  { '@type': 'City', name: 'الخبر' },
                  { '@type': 'City', name: 'الدمام' },
                  { '@type': 'City', name: 'القطيف' },
                  { '@type': 'AdministrativeArea', name: 'المنطقة الشرقية' },
                  { '@type': 'Country', name: 'المملكة العربية السعودية' },
                ],
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '5.0',
                  reviewCount: '78',
                  bestRating: '5',
                  worstRating: '1',
                },
                sameAs: [
                  'https://www.tiktok.com',
                  'https://www.instagram.com',
                  'https://www.youtube.com',
                ],
              },
            ]),
          }}
        />
      </head>
      <body className="font-madani bg-[#FAF8F5] text-[#1E1D1B] antialiased selection:bg-[#D4A63D] selection:text-black w-full max-w-full overflow-x-hidden overflow-x-clip relative">
        <LanguageProvider>
          <SmoothScrollProvider>
            {children}
            <FloatingContactWidget />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
