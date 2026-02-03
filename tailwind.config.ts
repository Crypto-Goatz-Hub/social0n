import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Social0n brand colors - teal to green gradient
        brand: {
          teal: '#14B8A6',
          green: '#22C55E',
          lime: '#84CC16',
        },
        // Dark theme
        dark: {
          900: '#0a0a0f',
          800: '#0f1115',
          700: '#151922',
          600: '#1a1f2e',
          500: '#242b3d',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #14B8A6 0%, #22C55E 50%, #84CC16 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(20, 184, 166, 0.3), 0 0 60px rgba(34, 197, 94, 0.15)',
        'glow-lg': '0 0 50px rgba(20, 184, 166, 0.4), 0 0 100px rgba(34, 197, 94, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
