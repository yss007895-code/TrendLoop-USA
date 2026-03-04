import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff5f2',
          100: '#ffe8e0',
          200: '#ffd0c2',
          300: '#ffb09a',
          400: '#ff8b6b',
          500: '#FF6B47',
          600: '#e55530',
          700: '#c44425',
          800: '#9e371f',
          900: '#7d2f1c',
          950: '#44160b',
        },
        surface: {
          DEFAULT: '#ffffff',
          light: '#fafafa',
          muted: '#f5f5f4',
          border: '#e7e5e4',
          'border-dark': '#d6d3d1',
        },
        accent: '#FF6B47',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-bottom': 'slideInBottom 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInBottom: { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
export default config;
