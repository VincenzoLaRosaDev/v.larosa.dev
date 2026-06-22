import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        sm: ['14px', '21px'],
        base: ['16px', '24px'],
        lg: ['18px', '27px'],
        xl: ['20px', '30px'],
        '2xl': ['24px', '36px'],
        '3xl': ['32px', '48px'],
        '4xl': ['36px', '54px'],
      },
      colors: {
        primary: 'var(--primary)',
        'primary/10': 'var(--primary-100)',
        'primary/90': 'var(--primary-900)',
        accent: 'var(--accent)',
        'accent/10': 'var(--accent-100)',
        bg: 'var(--bg)',
        text: 'var(--text)',
        'text-light': 'var(--text-light)',
        black: '#2D2D2D',
        'black-grey': '#4C4C4C',
        grey: '#8F8F8F',
        'light-grey': '#C1C1C1',
        light: '#EAEAEA',
        white: '#F4F4F4',
      },
      keyframes: {
        'cursor-pulse': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'rec-blink': {
          '0%, 100%': { opacity: '1' },
          '30%': { opacity: '0.1' },
        },
      },
      animation: {
        'cursor-pulse': 'cursor-pulse 1s steps(2, jump-none) infinite',
        'rec-blink': 'rec-blink 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
