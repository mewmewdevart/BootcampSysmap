module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/tests/**/*.test.(ts|js)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1'
  },
};