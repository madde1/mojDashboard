/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          200: '#E7EEEE',
          300: '#2A6B6B',
        },
        'orange': {
          400: '#D56F27',
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    scrollSmooth: true,
  },
} 