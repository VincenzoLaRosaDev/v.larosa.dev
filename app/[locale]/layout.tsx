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
        sizes: '48x48',
        url: '/icon/favicon-48x48.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        url: '/icon/favicon-96x96.png',
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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages(locale);

  return (
    <html className="bg-bg" lang={locale}>
      <body className="bg-bg">
        <main>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProviders>
              <div className="bg-bg text-text archivo max-w-7xl mx-auto">
                <div className="px-3 lg:px-9">{children}</div>
              </div>
              <MouseCursor />
            </ThemeProviders>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
