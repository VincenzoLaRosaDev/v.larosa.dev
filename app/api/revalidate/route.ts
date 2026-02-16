import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from '@/i18n/routing';

export async function POST(request: NextRequest) {
  try {
    // Verifica il secret token per sicurezza
    const secret = request.nextUrl.searchParams.get('secret');
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { _type, language } = body;

    // Se è un documento di tipo "page", revalida le homepage per tutte le locale
    if (_type === 'page') {
      // Revalida tutte le homepage per ogni locale
      for (const locale of locales) {
        revalidateTag(`homepage-${locale}`);
        revalidatePath(`/${locale}`, 'page');
      }
      revalidateTag('pages');
    }

    // Se è un documento di tipo "link", revalida i link
    if (_type === 'link') {
      revalidateTag('links');
      // Revalida anche tutte le pagine che potrebbero usare i link
      for (const locale of locales) {
        revalidatePath(`/${locale}`, 'page');
      }
    }

    // Revalida anche il layout per sicurezza
    for (const locale of locales) {
      revalidatePath(`/${locale}`, 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
      language,
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
