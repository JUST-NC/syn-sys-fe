module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
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
