module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    // '^^.*?/fetch$': '<rootDir>/src/utils/__mocks__/fetch', // This maps any 'http' import to the mock module
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
