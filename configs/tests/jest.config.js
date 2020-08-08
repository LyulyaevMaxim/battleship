const path = require('path'),
  root = path.resolve(__dirname, '../../')

module.exports = {
  testURL: `http://0.0.0.0`,
  resolver: 'browser-resolve',
  roots: [`${root}/src`, `./__mocks__`],
  testMatch: [`${root}/src/**/__tests__/**/*.unit.[jt]s?(x)`],
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  preset: 'ts-jest',
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': `./jest-preprocess.js`,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: [`${root}/node_modules`, `${root}/src`],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '^lodash-es$': 'lodash',
  },

  globals: {
    __PATH_PREFIX__: ``,
    'ts-jest': {
      tsConfig: `${root}/tsconfig.json`,
    },
  },
  setupFiles: [`./loadershim.js`],
  setupFilesAfterEnv: [`./jest.setup.js`],
  bail: 1,
  notify: true,
  errorOnDeprecated: true,
  prettierPath: `${root}/node_modules/prettier`,
  coverageDirectory: `./coverage/`,
  coverageReporters: ['json', 'lcov', 'text'],
  collectCoverageFrom: [`**/*.(ts|js)x?`],
  coveragePathIgnorePatterns: ['**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
}
