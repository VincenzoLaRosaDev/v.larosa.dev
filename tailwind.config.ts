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
      screens: {
        tablet: { min: '425px', max: '1023px' },
        /* Third mosaic column: only past this width, otherwise laptop screens end
           up with columns too narrow to hold a comfortable text measure. */
        wide: '1600px',
      },
      /* Fluid scale: sizes grow with the viewport so tiles stay filled on
         screens wider than a laptop without needing per-breakpoint classes. */
      fontSize: {
        xs: ['13px', '20px'],
        sm: ['15px', '23px'],
        base: ['clamp(16px, 0.95rem + 0.15vw, 18px)', '1.6'],
        lg: ['clamp(18px, 1.05rem + 0.2vw, 20px)', '1.5'],
        xl: ['clamp(20px, 1.15rem + 0.35vw, 24px)', '1.4'],
        '2xl': ['clamp(24px, 1.3rem + 0.55vw, 31px)', '1.25'],
        '3xl': ['clamp(30px, 1.5rem + 0.9vw, 42px)', '1.15'],
        '4xl': ['clamp(36px, 1.7rem + 1.3vw, 54px)', '1.08'],
        '5xl': ['clamp(44px, 2rem + 2vw, 72px)', '1.04'],
        '6xl': ['clamp(54px, 2.4rem + 3vw, 96px)', '1'],
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
