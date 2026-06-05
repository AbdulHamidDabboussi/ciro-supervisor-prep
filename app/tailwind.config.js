/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4fb',
          100: '#d6e4f5',
          200: '#aecbe9',
          300: '#7ea9d8',
          400: '#4f86c4',
          500: '#2f67ab',
          600: '#235189',
          700: '#1d416e',
          800: '#1a385c',
          900: '#152943',
          950: '#0d1a2e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
