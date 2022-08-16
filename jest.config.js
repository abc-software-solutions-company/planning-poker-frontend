// You can learn more about each option below in the Jest docs: https://jestjs.io/docs/configuration.

module.exports = {
  // The test environment that will be used for testing, jsdom for browser environment
  testEnvironment: 'jest-environment-jsdom',

  // Jest transformations
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {presets: ['next/babel']}]
  },

  // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Code coverage config
  // collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**', '!**/__mocks__/**'],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura', 'lcov'],
  reporters: [
    'default',
    [
      // generate JUnit report
      'jest-junit',
      {
        outputDirectory: './coverage',
        suiteName: 'jest tests',
        ancestorSeparator: ' › ',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        usePathForSuiteName: 'true',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ],

  // Important: order matters, specific rules should be defined first
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/src/__mocks__/fileMock.js`,

    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  testMatch: ['<rootDir>/**/*.test.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],

  verbose: true,
  testTimeout: 30000
};
