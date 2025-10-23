# Architecture Documentation

Detailed architecture documentation for the NYT News Feed app.

## Table of Contents

1. [Overview](#overview)
2. [Architecture Patterns](#architecture-patterns)
3. [Data Flow](#data-flow)
4. [Component Hierarchy](#component-hierarchy)
5. [State Management](#state-management)
6. [API Layer](#api-layer)
7. [Offline Strategy](#offline-strategy)
8. [Performance Optimizations](#performance-optimizations)

## Overview

The app follows a **unidirectional data flow** architecture using Redux for state management, React Navigation for routing, and a modular component structure.

### Key Principles

- **Separation of Concerns**: Clear separation between UI, business logic, and data
- **Single Source of Truth**: Redux as the central state management
- **Modularity**: Reusable components and utilities
- **Type Safety**: JSDoc comments for documentation (TypeScript can be added)
- **Testability**: Pure functions and isolated components

## Architecture Patterns

### 1. Feature-Based Structure

```
src/
├── api/           # API clients and configuration
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── navigation/    # Navigation configuration
├── redux/         # State management
├── screens/       # Screen components
├── theme/         # Design system
└── utils/         # Utility functions
```

### 2. Container/Presentational Pattern

**Container Components** (Smart Components):
- `HomeScreen`: Manages state, data fetching, and business logic
- `ArticleDetailScreen`: Handles navigation and data

**Presentational Components** (Dumb Components):
- `ArticleCard`: Pure UI component
- `SectionFilter`: Displays section buttons
- `FilterDropdown`: Input component

### 3. Custom Hooks Pattern

Encapsulates complex logic in reusable hooks:
- `useArticles`: Manages article fetching, caching, and filtering
- `useNetworkStatus`: Monitors network connectivity

## Data Flow

```
┌─────────────────┐
│   User Action   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Component     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Dispatch       │
│  Redux Action   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Redux Thunk    │ ◄─────┐
│  (Async)        │       │
└────────┬────────┘       │
         │                │
         ▼                │
┌─────────────────┐       │
│   API Call      │       │
└────────┬────────┘       │
         │                │
         ▼                │
┌─────────────────┐       │
│   Response      │       │
└────────┬────────┘       │
         │                │
         ▼                │
┌─────────────────┐       │
│  Reducer        │       │
│  Update State   │       │
└────────┬────────┘       │
         │                │
         ▼                │
┌─────────────────┐       │
│  Redux Persist  │───────┘
│  Save to Cache  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Component      │
│  Re-render      │
└─────────────────┘
```

## Component Hierarchy

```
App
├── Provider (Redux)
│   └── PersistGate
│       └── SafeAreaProvider
│           └── NavigationContainer
│               └── RootNavigator (Stack)
│                   ├── HomeScreen
│                   │   ├── SectionFilter
│                   │   ├── FilterDropdown (Location)
│                   │   ├── FilterDropdown (Keywords)
│                   │   └── FlatList
│                   │       └── ArticleCard (multiple)
│                   │
│                   └── ArticleDetailScreen
│                       ├── Image
│                       ├── Title & Metadata
│                       └── Back Button
```

## State Management

### Redux Store Structure

```javascript
{
  articles: {
    articlesBySection: {
      home: [...articles],
      world: [...articles],
      science: [...articles],
    },
    currentArticles: [...articles],
    loading: false,
    error: null,
    lastFetchTime: {
      home: 1697812800000,
      world: 1697812900000,
    }
  },
  preferences: {
    selectedSection: 'home',
    filters: {
      location: 'Paris',
      keywords: 'climate'
    }
  }
}
```

### Redux Slices

#### Articles Slice

**State**:
- `articlesBySection`: Cached articles by section
- `currentArticles`: Currently displayed articles
- `loading`: Loading state
- `error`: Error state
- `lastFetchTime`: Cache timestamps

**Actions**:
- `fetchArticles`: Async thunk to fetch articles from API
- `setCurrentArticlesFromCache`: Load cached articles
- `clearError`: Clear error state
- `clearArticles`: Clear all cached articles

#### Preferences Slice

**State**:
- `selectedSection`: Currently selected news section
- `filters`: Active filters (location, keywords)

**Actions**:
- `setSelectedSection`: Change selected section
- `setLocationFilter`: Set location filter
- `setKeywordsFilter`: Set keywords filter
- `clearFilters`: Clear all filters
- `resetPreferences`: Reset to defaults

### Redux Persist Configuration

```javascript
{
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['articles', 'preferences'],
  version: 1,
}
```

**Benefits**:
- Offline access to cached articles
- Persists user preferences across app restarts
- Seamless user experience

## API Layer

### Structure

```
api/
├── config.js       # API configuration and constants
├── nytApi.js      # API client with retry logic
└── index.js       # Exports
```

### API Client Features

#### 1. Fetch with Timeout
```javascript
const fetchWithTimeout = async (url, options, timeout) => {
  // Abort request if it takes too long
  // Prevents hanging requests
}
```

#### 2. Retry with Exponential Backoff
```javascript
const retryWithBackoff = async (fn, maxRetries, delay) => {
  // Retry failed requests with increasing delays
  // Handles temporary network issues
}
```

#### 3. Response Transformation
```javascript
const transformArticles = (apiResponse) => {
  // Normalize API response to app format
  // Extract relevant fields
}
```

### Error Handling

Custom `ApiError` class:
```javascript
class ApiError extends Error {
  constructor(message, status, data) {
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}
```

Error types handled:
- Network errors (no connection)
- Timeout errors (request too slow)
- API errors (4xx, 5xx status codes)
- Rate limit errors (429)

## Offline Strategy

### Multi-Layer Caching

1. **Redux State Cache**
   - In-memory cache of fetched articles
   - Fast access to recently viewed data

2. **Persistent Cache (Redux Persist)**
   - AsyncStorage-backed persistence
   - Survives app restarts
   - Automatic rehydration on launch

3. **Cache Invalidation**
   - 5-minute cache duration
   - Manual refresh via pull-to-refresh
   - Automatic refresh when cache expires

### Offline Flow

```
User opens app
    │
    ▼
Check cache ◄────────────┐
    │                    │
    ├─ Valid cache?      │
    │   Yes → Use cache  │
    │                    │
    └─ No → Fetch API    │
        │                │
        ├─ Success? ─────┘
        │   Update cache
        │
        └─ Failed?
            Use stale cache
            Show warning
```

### Network Resilience Features

- **Automatic retries**: Up to 3 attempts with backoff
- **Graceful degradation**: Show cached data on failure
- **User feedback**: Cache status indicators
- **Pull-to-refresh**: Manual refresh option

## Performance Optimizations

### 1. FlatList Optimization

```javascript
<FlatList
  data={articles}
  renderItem={renderArticle}
  keyExtractor={(item) => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
/>
```

### 2. Memoization

Components can be wrapped with `React.memo()`:
```javascript
export default React.memo(ArticleCard, (prev, next) => {
  return prev.article.id === next.article.id;
});
```

### 3. Image Optimization

- Use `expo-image` for better performance
- Lazy loading with FlatList
- Placeholder images for loading states

### 4. Redux Selector Optimization

Use reselect for memoized selectors:
```javascript
const selectFilteredArticles = createSelector(
  [selectArticles, selectFilters],
  (articles, filters) => applyFilters(articles, filters)
);
```

### 5. Debounced Filters

Filter inputs can be debounced to prevent excessive re-renders:
```javascript
const debouncedSetFilter = useCallback(
  debounce((value) => dispatch(setFilter(value)), 300),
  []
);
```

## Navigation Architecture

### Stack Navigator

```
RootNavigator (Stack)
├── Home (Initial)
└── ArticleDetail
```

**Navigation Flow**:
1. User taps article on Home screen
2. Navigate to ArticleDetail with article data
3. User taps Back button
4. Pop back to Home screen

**Navigation Props**:
```javascript
// Navigate with params
navigation.navigate('ArticleDetail', { article });

// Go back
navigation.goBack();

// Access params
const { article } = route.params;
```

## Theme System

### Centralized Design Tokens

```
theme/
├── colors.js      # Color palette
├── typography.js  # Text styles
├── spacing.js     # Spacing values
└── index.js       # Combined theme
```

**Benefits**:
- Consistent styling across app
- Easy theme switching (light/dark mode)
- Maintainable design system
- Type-safe with JSDoc

### Usage

```javascript
import { colors, typography, spacing } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
});
```

## Testing Architecture

### Test Pyramid

```
       ┌────────────┐
       │    E2E     │  Few (10%)
       └────────────┘
      ┌──────────────┐
      │ Integration  │  Some (30%)
      └──────────────┘
    ┌──────────────────┐
    │      Unit        │  Many (60%)
    └──────────────────┘
```

### Test Coverage

- **Unit Tests**: Utils, Redux slices, pure functions
- **Component Tests**: Rendering, props, interactions
- **Integration Tests**: Hooks with Redux, API calls
- **E2E Tests**: User flows (future)

### Mocking Strategy

- Mock API calls in component/integration tests
- Mock AsyncStorage for persistence tests
- Use fake timers for date/time tests
- Mock navigation in screen tests

## Security Considerations

### API Key Management

- ❌ Don't commit API keys to version control
- ✅ Use environment variables for production
- ✅ Implement key rotation strategy
- ✅ Monitor API usage and rate limits

### Data Validation

- Validate API responses before processing
- Sanitize user inputs
- Handle malformed data gracefully

### Error Handling

- Never expose sensitive errors to users
- Log errors for debugging
- Provide user-friendly error messages

## Scalability

### Future Enhancements

1. **TypeScript Migration**
   - Add type safety
   - Better IDE support
   - Catch errors at compile time

2. **Dark Mode**
   - Leverage theme system
   - Add theme context
   - Persist theme preference

3. **Multiple Languages**
   - Use i18n library
   - Localized content
   - RTL support

4. **Push Notifications**
   - Breaking news alerts
   - Personalized notifications

5. **Bookmarks/Favorites**
   - Save articles for later
   - Sync across devices

6. **Search Functionality**
   - Full-text search
   - Search history
   - Advanced filters

7. **Social Sharing**
   - Share articles
   - Deep linking

## Conclusion

This architecture provides:
- ✅ **Maintainability**: Clear structure and separation of concerns
- ✅ **Scalability**: Easy to add new features
- ✅ **Testability**: Isolated, testable components
- ✅ **Performance**: Optimized rendering and caching
- ✅ **Reliability**: Offline capability and error handling
- ✅ **Developer Experience**: Well-documented, easy to understand

