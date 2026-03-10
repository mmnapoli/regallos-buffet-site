/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#800020',
        'primary-light': '#9A1B3A',
        'primary-dark': '#600018',
        accent: '#D4AF37',
        'accent-light': '#E4C76B',
        'accent-dark': '#B8962E',
        background: '#FFFFFF',
        'background-warm': '#FEF9F5',
        'text-main': '#1A1A1A',
        'text-muted': '#475569',
        'border-light': '#E2E8F0',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Karla', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(0,0,0,0.05)',
        'card': '0 4px 6px rgba(0,0,0,0.07)',
        'elevated': '0 10px 15px rgba(0,0,0,0.1)',
        'sticky': '0 -4px 12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
