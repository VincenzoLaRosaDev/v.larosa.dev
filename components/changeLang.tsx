'use client';

import { Link, navLang, usePathname } from '@/i18n/routing';
import { TailwindProps } from '@/types';
import { useTranslations } from 'next-intl';

export const ChangeLang = ({ className }: TailwindProps) => {
  const t = useTranslations('Index');
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {navLang.map((item) => (
        <Link
          key={item.id}
          href={pathname}
          locale={item.id}
          className={`rounded-lg px-3 py-1 text-xs uppercase archivo-black transition-all ${
            item.id === t('current')
              ? 'pointer-events-none bg-primary text-[var(--cta-fg)] font-semibold'
              : 'text-text-light bg-[color-mix(in_srgb,var(--paper-ink)_6%,transparent)] hover:bg-[color-mix(in_srgb,var(--paper-ink)_10%,transparent)]'
          }`}
        >
          {item.id}
        </Link>
      ))}
    </div>
  );
};
