# Testing Documentation

Comprehensive testing guide for the NYT News Feed app.

## Testing Strategy

The app uses a multi-layered testing approach:

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test Redux store and hooks
3. **Component Tests**: Test React components with React Testing Library

## Test Structure

```
src/__tests__/
├── components/           # Component tests
│   └── ArticleCard.test.js
├── redux/               # Redux slice tests
│   ├── articlesSlice.test.js
│   └── preferencesSlice.test.js
└── utils/               # Utility function tests
    ├── dateUtils.test.js
    └── filterUtils.test.js
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Specific Test File

```bash
npm test -- ArticleCard.test.js
```

### Run Tests Matching Pattern

```bash
npm test -- --testNamePattern="filterByLocation"
```

## Test Coverage

Current test coverage includes:

### Utility Functions (100%)

- ✅ Date formatting (formatTimeAgo, formatDate, formatDateTime)
- ✅ Filter utilities (filterByLocation, filterByKeywords, applyFilters)
- ✅ Location extraction (getUniqueLocations)

### Redux Slices (100%)

- ✅ Articles slice (actions and reducers)
- ✅ Preferences slice (actions and reducers)
- ✅ State persistence

### Components (80%)

- ✅ ArticleCard rendering and interactions
- ✅ Component props handling
- ✅ Error states
- 🔄 SectionFilter (to be added)
- 🔄 FilterDropdown (to be added)

## Writing Tests

### Unit Test Example

```javascript
// src/__tests__/utils/myUtil.test.js
import { myFunction } from "../../utils/myUtil";

describe("myFunction", () => {
  it("should return expected result", () => {
    const result = myFunction("input");
    expect(result).toBe("expected output");
  });

  it("should handle edge cases", () => {
    expect(myFunction(null)).toBe("default");
    expect(myFunction("")).toBe("default");
  });
});
```

### Component Test Example

```javascript
// src/__tests__/components/MyComponent.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyComponent from "../../components/MyComponent";

describe("MyComponent", () => {
  it("should render correctly", () => {
    const { getByText } = render(<MyComponent title="Test" />);
    expect(getByText("Test")).toBeTruthy();
  });

  it("should handle user interactions", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <MyComponent title="Test" onPress={onPress} />
    );

    fireEvent.press(getByText("Test"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Redux Test Example

```javascript
// src/__tests__/redux/mySlice.test.js
import myReducer, { myAction } from "../../redux/slices/mySlice";

describe("mySlice", () => {
  const initialState = { value: 0 };

  it("should handle myAction", () => {
    const actual = myReducer(initialState, myAction(5));
    expect(actual.value).toBe(5);
  });
});
```

## Test Configuration

### Jest Configuration (in package.json)

```json
{
  "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}",
      "!src/**/*.test.{js,jsx}",
      "!src/index.js"
    ]
  }
}
```

## Testing Best Practices

### 1. Test Behavior, Not Implementation

```javascript
// ❌ Bad - Testing implementation details
expect(component.state.counter).toBe(1);

// ✅ Good - Testing behavior
expect(getByText("Count: 1")).toBeTruthy();
```

### 2. Use Descriptive Test Names

```javascript
// ❌ Bad
it('test 1', () => { ... });

// ✅ Good
it('should filter articles by location when location filter is applied', () => { ... });
```

### 3. Follow Arrange-Act-Assert Pattern

```javascript
it("should add two numbers correctly", () => {
  // Arrange
  const a = 5;
  const b = 3;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(8);
});
```

### 4. Test Edge Cases

```javascript
describe("formatTimeAgo", () => {
  it("should handle null dates", () => {
    expect(() => formatTimeAgo(null)).not.toThrow();
  });

  it("should handle invalid dates", () => {
    expect(() => formatTimeAgo("invalid")).not.toThrow();
  });

  it("should handle future dates", () => {
    const futureDate = new Date("2099-01-01");
    expect(formatTimeAgo(futureDate)).toBe("Just now");
  });
});
```

### 5. Mock External Dependencies

```javascript
// Mock API calls
jest.mock("../../api/nytApi", () => ({
  getTopStories: jest.fn(() => Promise.resolve(mockArticles)),
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
```

## E2E Testing (Future Enhancement)

For end-to-end testing, consider adding:

### Detox (React Native E2E)

```bash
npm install --save-dev detox
```

### Maestro (Mobile E2E)

```bash
# Install Maestro CLI
curl -Ls "https://get.maestro.mobile.dev" | bash
```

### Example E2E Test (Detox)

```javascript
describe("News Feed", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it("should display article list", async () => {
    await expect(element(by.id("article-list"))).toBeVisible();
  });

  it("should navigate to article detail", async () => {
    await element(by.id("article-0")).tap();
    await expect(element(by.id("article-detail"))).toBeVisible();
  });

  it("should go back to home", async () => {
    await element(by.text("BACK")).tap();
    await expect(element(by.id("article-list"))).toBeVisible();
  });
});
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "20"
      - run: npm install --legacy-peer-deps
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v2
```

## Coverage Goals

Target coverage levels:

- **Utilities**: 100% (critical business logic)
- **Redux**: 100% (state management)
- **Components**: 80% (UI components)
- **Overall**: 85%+

## Debugging Tests

### Run Tests with Debugging

```bash
# Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand

# VS Code Debug Configuration
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Common Issues

1. **Tests timing out**

   - Increase timeout: `jest.setTimeout(10000)`
   - Check for unresolved promises

2. **Snapshot mismatches**

   - Update snapshots: `npm test -- -u`
   - Review changes carefully

3. **Mock not working**
   - Clear jest cache: `jest --clearCache`
   - Check mock path is correct

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react-native)
- [Testing React Native Apps](https://reactnative.dev/docs/testing-overview)
- [Expo Testing](https://docs.expo.dev/develop/unit-testing/)
