const path = require('path'),
  root = path.resolve(__dirname, '../../'),
  withJS = true //process.env.withJS === 'true'

module.exports = {
  ...(withJS && { processors: ['stylelint-processor-styled-components'] }),
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-airbnb',
    withJS && 'stylelint-config-styled-components',
    'stylelint-config-standard',
    'stylelint-config-prettier',
  ].filter(Boolean),
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
    'stylelint-color-format',
    'stylelint-at-rule-no-children',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-low-performance-animation-properties': [
      true,
      { ignoreProperties: ['color', 'background-color', 'border-color'] },
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: require(`${root}/package.json`).browserslist,
        severity: 'warning',
      },
    ],
    'color-format/format': {
      format: 'hsl',
    },
    'aditayvm/at-rule-no-children': [{ severity: 'warning' }],
    'order/order': null, //['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
    // 'order/properties-alphabetical-order': true,
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    // 'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$', //lowerCamelCase
    'block-no-empty': null,
    'at-rule-no-unknown': null,
    'max-nesting-depth': null,
    'no-descending-specificity': null,
    'no-missing-end-of-source-newline': null,
    'comment-empty-line-before': null,
    'comment-whitespace-inside': null,
    'value-keyword-case': null,
    ...(withJS && { 'no-empty-source': null }),
  },
}
