'use client';

import { defaultLocale } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const RedirectHome = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/${defaultLocale}`);
  }, [router]);

  return null;
};
