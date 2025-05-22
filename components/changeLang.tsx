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
          data-cursor-interactive
          key={item.id}
          href={pathname}
          locale={item.id}
          className={`rounded-lg px-3 py-1 text-xs uppercase archivo-black transition-all ${
            item.id === t('current')
              ? 'pointer-events-none bg-primary text-bg font-semibold'
              : 'text-text-light bg-grey/5 hover:bg-grey/10'
          }`}
        >
          {item.id}
        </Link>
      ))}
    </div>
  );
};
