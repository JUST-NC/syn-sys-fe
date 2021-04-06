module.exports = {
  // style: {
  //   postcss: {
  //     plugins: [require('tailwindcss'), require('autoprefixer')],
  //   },
  // },
  babel: {
    plugins: [
      'babel-plugin-macros',
      [
        '@emotion/babel-plugin-jsx-pragmatic',
        {
          export: 'jsx',
          import: '__cssprop',
          module: '@emotion/react',
        },
      ],
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: '__cssprop',
          pragmaFrag: 'React.Fragment',
        },
      ],
    ],
  },
};
