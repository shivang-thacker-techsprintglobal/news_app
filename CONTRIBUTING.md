# Contributing Guide

Thank you for considering contributing to the NYT News Feed app! This guide will help you get started.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Style](#code-style)
4. [Commit Guidelines](#commit-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Testing Requirements](#testing-requirements)

## Getting Started

### Prerequisites

- Node.js v20.19.4 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Initial Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/news_app.git
   cd news_app
   ```

3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

4. Set up NYT API key (see [API_SETUP.md](API_SETUP.md))

5. Start the development server:
   ```bash
   npm start
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/add-bookmark-functionality`
- `fix/article-image-loading`
- `refactor/redux-slices`
- `docs/update-readme`
- `test/add-component-tests`

### Development Process

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Write/update tests
4. Test your changes:
   ```bash
   npm test
   npm start
   ```

5. Commit your changes (see [Commit Guidelines](#commit-guidelines))
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

7. Create a Pull Request

## Code Style

### JavaScript/React Native

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add JSDoc comments for functions

#### Example Component

```javascript
/**
 * MyComponent
 * 
 * Brief description of what the component does
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display
 * @param {Function} props.onPress - Callback when pressed
 * @returns {JSX.Element}
 */
const MyComponent = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyComponent;
```

#### Example Function

```javascript
/**
 * Calculate the sum of two numbers
 * 
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 * 
 * @example
 * const result = add(5, 3); // returns 8
 */
export const add = (a, b) => {
  return a + b;
};
```

### File Organization

- One component per file
- Export default for main component
- Named exports for utilities
- Index files for barrel exports

### Styling

- Use StyleSheet.create()
- Follow theme system (colors, typography, spacing)
- Place styles at bottom of file
- Group related styles together

```javascript
const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Text styles
  title: {
    fontSize: typography.fontSize.xl,
    color: colors.textPrimary,
  },
  
  // Button styles
  button: {
    padding: spacing.md,
    borderRadius: 8,
  },
});
```

### Imports

Order imports logically:
```javascript
// 1. React/React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Third-party libraries
import { useDispatch, useSelector } from 'react-redux';

// 3. Local components
import { ArticleCard } from '../components';

// 4. Redux/State
import { fetchArticles } from '../redux';

// 5. Utils/Theme
import { formatDate } from '../utils';
import { colors, spacing } from '../theme';
```

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
# Good commit messages
git commit -m "feat(articles): add bookmark functionality"
git commit -m "fix(filters): resolve location filter case sensitivity"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(utils): add tests for date formatting"

# Bad commit messages (avoid these)
git commit -m "fix stuff"
git commit -m "update"
git commit -m "WIP"
```

### Detailed Commit Message Example

```
feat(articles): add bookmark functionality

- Add bookmark icon to article cards
- Implement bookmark toggle action
- Create bookmarks slice in Redux
- Persist bookmarked articles
- Add bookmarks screen to navigation

Closes #123
```

## Pull Request Process

### Before Submitting

1. **Update from main**:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Check linting**:
   ```bash
   npm run lint
   ```

4. **Test on device/simulator**:
   ```bash
   npm run ios
   npm run android
   ```

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List of specific changes
- Another change
- etc.

## Testing
- [ ] Unit tests added/updated
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested offline functionality

## Screenshots (if applicable)
Add screenshots or GIFs showing the changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No console warnings/errors
- [ ] Backward compatible (or breaking change documented)
```

### Review Process

1. Automated checks must pass (tests, linting)
2. At least one approval from maintainer
3. All review comments addressed
4. No merge conflicts

## Testing Requirements

### Required Tests

For new features, include:
- **Unit tests** for utilities and Redux logic
- **Component tests** for new components
- **Integration tests** for hooks and complex flows

### Test Coverage

Maintain test coverage:
- New code should have 80%+ coverage
- Don't decrease overall coverage
- Critical paths should have 100% coverage

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Specific test file
npm test -- MyComponent.test.js
```

### Writing Tests

Follow the testing guide in [TESTING.md](TESTING.md)

Example test:
```javascript
describe('MyComponent', () => {
  it('should render title correctly', () => {
    const { getByText } = render(<MyComponent title="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <MyComponent title="Test" onPress={onPress} />
    );
    
    fireEvent.press(getByText('Test'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## Documentation

### When to Update Documentation

Update docs when you:
- Add new features
- Change APIs or interfaces
- Modify configuration
- Add new dependencies
- Change project structure

### Documentation Files

- `README.md`: Project overview and quick start
- `ARCHITECTURE.md`: Architecture decisions and patterns
- `API_SETUP.md`: API configuration guide
- `TESTING.md`: Testing guide
- `CONTRIBUTING.md`: This file

### JSDoc Comments

Add JSDoc comments for:
- All exported functions
- Component props
- Complex logic
- Non-obvious code

## Common Tasks

### Adding a New Component

1. Create component file in `src/components/`
2. Add JSDoc documentation
3. Create test file in `src/__tests__/components/`
4. Export from `src/components/index.js`
5. Use in screen/component

### Adding a New Redux Slice

1. Create slice in `src/redux/slices/`
2. Add to store in `src/redux/store/index.js`
3. Export actions/selectors from `src/redux/index.js`
4. Create tests in `src/__tests__/redux/`
5. Document in ARCHITECTURE.md

### Adding a New Screen

1. Create screen in `src/screens/`
2. Add to navigation in `src/navigation/RootNavigator.js`
3. Export from `src/screens/index.js`
4. Create tests
5. Update navigation flow documentation

### Adding a New Utility

1. Create utility in `src/utils/`
2. Export from `src/utils/index.js`
3. Write comprehensive tests
4. Add JSDoc documentation
5. Add examples

## Code Review Guidelines

### As a Reviewer

- Be constructive and respectful
- Explain the "why" behind suggestions
- Approve when changes look good
- Request changes if issues found
- Ask questions if unclear

### As an Author

- Respond to all comments
- Be open to feedback
- Make requested changes
- Ask for clarification if needed
- Mark conversations as resolved

## Getting Help

- Check existing documentation
- Search through issues
- Ask questions in discussions
- Reach out to maintainers

## Recognition

Contributors will be:
- Listed in README
- Credited in release notes
- Appreciated for their time and effort

Thank you for contributing! 🎉

