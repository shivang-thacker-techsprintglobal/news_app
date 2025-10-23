/**
 * Jest Polyfills
 *
 * Polyfills for React Native testing environment
 */

// Polyfill for Object.hasOwn (required by React 19)
if (!Object.hasOwn) {
  Object.hasOwn = Object.prototype.hasOwnProperty.call.bind(
    Object.prototype.hasOwnProperty
  );
}

// Fix for React 19 act implementation
global.IS_REACT_ACT_ENVIRONMENT = true;

// Mock global fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
  })
);

// Mock React Native's global objects
global.__DEV__ = true;

// Mock React Native Appearance
global.Appearance = {
  getColorScheme: () => "light",
  addChangeListener: jest.fn(),
  removeChangeListener: jest.fn(),
};

// Mock Expo modules
jest.mock("expo-constants", () => ({
  expoConfig: {},
  manifest: {},
}));

jest.mock("expo-status-bar", () => ({
  StatusBar: "StatusBar",
}));
