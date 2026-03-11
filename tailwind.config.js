/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#801f1a',
        'primary-light': '#9e2822',
        'primary-dark': '#621612',
        accent: '#801f1a',
        'accent-light': '#9e2822',
        'accent-dark': '#621612',
        background: '#FFFFFF',
        'background-warm': '#F5F2EE',
        'background-dark': '#141210',
        'text-main': '#1C1917',
        'text-muted': '#78716C',
        'border-light': '#E7E2DC',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
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
