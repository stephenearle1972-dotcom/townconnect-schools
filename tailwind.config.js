/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A4A',
        gold: '#D4A037',
        fog: '#E2E8F0',
        paper: '#F8F9FA',
        tcteal: '#2B7A78',
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
