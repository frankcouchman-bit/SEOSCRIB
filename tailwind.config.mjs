/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        bg1: '#0d183b',
        bg2: '#1f0f3f',
      },
      boxShadow: {
        xl2: '0 30px 70px rgba(0,0,0,.35)',
      },
    },
  },
  plugins: [],
};
