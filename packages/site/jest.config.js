module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
};
