'use client';

import { TailwindProps } from '@/types';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import LightModeIcon from '@/public/light-mode.svg';
import DarkModeIcon from '@/public/dark-mode.svg';

export const ToogleColorMode = ({ className }: TailwindProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onToogleColorModeSubmit = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return <div className="w-6"></div>;
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <button onClick={onToogleColorModeSubmit} className="group">
        {theme === 'dark' ? (
          <LightModeIcon className="w-6 fill-text-light group-hover:fill-text" />
        ) : (
          <DarkModeIcon className="w-6 fill-text-light group-hover:fill-text" />
        )}
      </button>
    </div>
  );
};
