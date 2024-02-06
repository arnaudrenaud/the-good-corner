/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testPathIgnorePatterns: ["<rootDir>/dist"],
  preset: "ts-jest",
  testEnvironment: "node",
};
