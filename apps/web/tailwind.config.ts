import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#050505',
          secondary: '#0D0D0D',
          tertiary: '#151515',
        },
        hairline: 'rgba(255, 255, 255, 0.05)',
        accent: {
          DEFAULT: '#D6B36A',
          light: '#E5C57A',
          dark: '#9E7A31',
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.65)',
        },
      },
      fontFamily: {
        ui: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'breathe-glow': 'breatheGlow 25s ease-in-out infinite alternate',
        'spin-slow': 'spin 0.8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        breatheGlow: {
          '0%': { opacity: '0.7', transform: 'translate(-50%, -50%) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
