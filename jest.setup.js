/**
 * Jest Setup Configuration
 *
 * Custom setup to handle React Native 19.x compatibility issues
 */

import "@testing-library/jest-native/extend-expect";

// Configure global act environment for React 19
global.IS_REACT_ACT_ENVIRONMENT = true;

// Mock React before anything else to fix React 19 compatibility
jest.mock("react", () => {
  const React = jest.requireActual("react");

  // Ensure ReactCurrentOwner exists
  if (!React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
      ReactCurrentOwner: { current: null },
      ReactCurrentDispatcher: { current: null },
      ReactDebugCurrentFrame: {},
    };
  }

  return React;
});

// Provide global act function for React 19 compatibility
global.act = require("react").act || ((callback) => callback());

// Mock expo-linear-gradient
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: "LinearGradient",
}));

// Mock expo-image
jest.mock("expo-image", () => ({
  Image: "Image",
}));

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: ({ name, size, color, ...props }) =>
      React.createElement("Ionicons", { testID: `icon-${name}`, ...props }),
    MaterialIcons: "MaterialIcons",
    FontAwesome: "FontAwesome",
    MaterialCommunityIcons: "MaterialCommunityIcons",
    Feather: "Feather",
  };
});

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) =>
      React.createElement("SafeAreaView", {}, children),
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

// Mock @react-navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  NavigationContainer: ({ children }) => children,
}));

// Silence specific console warnings during tests
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args) => {
    const arg = args[0];
    if (
      typeof arg === "string" &&
      (arg.includes("Warning: ReactDOM.render") ||
        arg.includes("Warning: useLayoutEffect") ||
        arg.includes("act(...)") ||
        arg.includes("Not implemented: HTMLFormElement"))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };

  console.error = (...args) => {
    const arg = args[0];
    if (
      typeof arg === "string" &&
      (arg.includes("Warning: ReactDOM.render") ||
        arg.includes("Warning: useLayoutEffect") ||
        arg.includes("act(...)") ||
        arg.includes("Not implemented: HTMLFormElement"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
