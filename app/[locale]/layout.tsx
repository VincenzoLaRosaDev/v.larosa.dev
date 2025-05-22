import './globals.css';
import './font.css';
import '@/theme/theme.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { ThemeProviders } from '@/theme';
import { MouseCursor } from '@/components';

export async function generateMetadata() {
  return {
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
      <body className="bg-bg">
        <main>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProviders>
              <div className="text-text archivo max-w-7xl mx-auto">
                <div className="lg:px-9">{children}</div>
              </div>
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-bg z-[-1]" />
              <MouseCursor />
            </ThemeProviders>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
