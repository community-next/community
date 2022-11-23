
module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  collectCoverageFrom: ["@community-next/**/*.{ts,tsx}"],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {

  },
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": "@swc-node/jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
