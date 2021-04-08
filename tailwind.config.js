module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
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
    ({ addUtilities }) => {
      addUtilities(
        {
          '.i-bg-default': {
            background:
              'linear-gradient(130deg, #ff7a18, #af002d 41.07%, #319197 76.05%)',
          },
        },
        ['responsive', 'hover'],
      );
    },
  ],
};
