module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    mainColor: '#675675',
    minHeight: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '1/4-screen': '25vh',
      '1/2-screen': '50vh',
      '3/4-screen': '75vh',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    ({ addUtilities, theme }) => {
      addUtilities(
        {
          '.i-bg': {
            background: 'linear-gradient(to bottom right, #dbfffd, #acb6e5)',
          },
          '.i-color': {
            color: theme('mainColor'),
          },
        },
        ['responsive', 'hover'],
      );
    },
  ],
};
