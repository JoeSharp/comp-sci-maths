// jest.config.js
const { defaults } = require("jest-config");
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleDirectories: ['node_modules', 'src'],
};