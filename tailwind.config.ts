import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        'primary-100': 'var(--primary-100)',
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'cursor-pulse': {
          '0%': { opacity: '0' },
          '100%': { opacity: '100%' },
        },
      },
      animation: {
        'cursor-pulse': 'cursor-pulse 1s ease-in-out infinite',
        'hamburger-show': 'hamburger-show .3s ease-in',
        'hamburger-hide': 'hamburger-hide .3s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
