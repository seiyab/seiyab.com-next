module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
    "@asm/(.*)": "<rootDir>/applications/assembly-emulator/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/*.test.(ts|tsx)"],
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  }
}