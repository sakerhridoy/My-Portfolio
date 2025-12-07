/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'];
export const theme = {
  extend: {
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' },
      },
    },
    animation: {
      float: 'float 6s ease-in-out infinite',
    },
  },
};
export const plugins = [];
