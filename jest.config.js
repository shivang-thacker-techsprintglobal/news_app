/**
 * Jest Configuration
 *
 * Custom configuration to handle React Native 19.x
 */

module.exports = {
  preset: "react-native",
  setupFiles: ["<rootDir>/jest.polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],

  moduleNameMapper: {
    "^react-native-vector-icons$": "@expo/vector-icons",
    "^react-native-vector-icons/(.*)": "@expo/vector-icons/$1",
    "\\.svg": "<rootDir>/__mocks__/svgMock.js",
  },

  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/*.test.{js,jsx}",
    "!src/index.js",
  ],

  testEnvironment: "node",

  testMatch: [
    "**/__tests__/**/*.(test|spec).js?(x)",
    "**/?(*.)+(spec|test).js?(x)",
  ],
};
