const nextJest = require("next/jest");
 
const createJestConfig = nextJest({
  dir: './',
});
 
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
}
module.exports = createJestConfig({
  ...customJestConfig,
  testMatch: [
    '**/__tests__/**/*.test.(ts|tsx|js|jsx)',
    '**/?(*.)+(test).(ts|tsx|js|jsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 80,
      lines: 95,
      statements: 95
    }
  }
});
 
