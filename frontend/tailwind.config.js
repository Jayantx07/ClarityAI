/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6C63FF',
          dark: '#4C46CC',
          light: '#8E89FF'
        }
      }
    }
  },
  plugins: []
};



