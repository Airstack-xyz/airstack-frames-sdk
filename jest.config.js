module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.base.json",
    },
  },
  moduleNameMapper: {
    // '^^.*?/fetch$': '<rootDir>/src/utils/__mocks__/fetch', // This maps any 'http' import to the mock module
  },
};
