import '@/theme/theme.css';
import '@/theme/glass.css';
import '@/theme/ambient.css';
import './globals.css';
import './font.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { AmbientLayer, MouseCursor, MouseCursorProvider } from '@/components';
import Script from 'next/script';

export async function generateMetadata() {
  return {
    themeColor: '#0b1713',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
    },
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/icon/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/icon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/icon/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icon/android-chrome-512x512.png',
      },
    ],
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Abilita ISR: revalida ogni 60 secondi o quando viene triggerato un webhook
export const revalidate = 60;

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function HomeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<any>;
}) {
  const locale = (await Promise.resolve(params)).locale;
  if (!locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Script id="iubenda-config" strategy="afterInteractive">
          {`
            var _iub = _iub || [];
            _iub.csConfiguration = {
              siteId: 4043574,
              cookiePolicyId: 96600430,
              lang: "en-GB",
              storage: { useSiteId: true }
            };
          `}
        </Script>
        <Script
          src="https://cs.iubenda.com/autoblocking/4043574.js"
          strategy="afterInteractive"
        />
        <Script
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          charSet="UTF-8"
          async
          strategy="afterInteractive"
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MouseCursorProvider>
            <AmbientLayer />
            <main className="relative z-[1]">
              <div className="relative z-[1] text-text archivo max-w-7xl mx-auto">
                <div className="relative z-[1] lg:px-9">{children}</div>
              </div>
              <MouseCursor />
            </main>
          </MouseCursorProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
