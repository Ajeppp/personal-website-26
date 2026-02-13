module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: '#0ea5e9',
          600: '#0ea5e9'
        }
      },
      borderRadius: {
        lg: '1rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
