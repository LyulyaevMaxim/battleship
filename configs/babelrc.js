const path = require('path'),
  root = path.resolve(__dirname, '../')

module.exports = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: require(`${root}/package.json`).browserslist,
        },
        modules: false,
        loose: true,
        spec: true,
        forceAllTransforms: true,
        useBuiltIns: 'usage',
        corejs: 3,
        debug: false,
      },
    ],
  ],
  plugins: ['@loadable/babel-plugin'],
}
