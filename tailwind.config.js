/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#58cc02',
          light: '#89e219',
          dark: '#46a302',
          contrast: '#ffffff',
        },
        brandblue: {
          DEFAULT: '#1cb0f6',
          dark: '#1899d6',
        },
        brandpurple: {
          DEFAULT: '#ce82ff',
          dark: '#a560e8',
        },
        secondary: {
          DEFAULT: '#475569',
          light: '#94a3b8',
          dark: '#1e293b',
        },
        background: {
          DEFAULT: '#f7f7f7',
          light: '#ffffff',
        },
        success: '#58cc02',
        warning: '#ffc800',
        danger: '#ff4b4b',
      },
    },
  },
  plugins: [],
};
