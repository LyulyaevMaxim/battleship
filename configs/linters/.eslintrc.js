const path = require('path'),
  root = path.resolve(__dirname, '../..')

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    'cypress/globals': true,
    'jest/globals': true,
  },
  globals: {
    graphql: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import', 'react', 'react-hooks', 'i18next', 'jest', 'cypress', 'chai-friendly', 'prettier'],
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'one-var': 0,
    'spaced-comment': 0,
    'no-param-reassign': 1,
    'default-case': 1,
    'no-use-before-define': 0,
    'no-unused-vars': 1,
    'no-shadow': 1,
    'no-return-await': 0,
    'prefer-template': 0,
    'prefer-rest-params': 1,
    'global-require': 0,

    'react/prop-types': 0,
    'react/jsx-no-literals': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-closing-tag-location': 0,
    'react/destructuring-assignment': 0,
    'react/no-children-prop': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-pascal-case': 0,
    'react/button-has-type': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/require-default-props': 2,
    'react/jsx-max-depth': [1, { max: 5 }],
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 2,

    'import/no-extraneous-dependencies': 0, //because of Yarn Workspaces
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0, //temp
    'import/extensions': 0, //temp

    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        '@typescript-eslint/no-namespace': 0,
      },
    },
  ],
  settings: {
    'import/core-modules': ['gatsby'],
    'import/resolver': {
      node: {
        paths: [`${root}/src`, `${root}/cypress`],
        extensions: ['.jsx', '.js', '.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
}
