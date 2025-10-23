# NYT News Feed App

A React Native mobile application for browsing New York Times top stories with offline capability, built with Expo, Redux Toolkit, and React Navigation.

## 📱 Features

- **Browse Top Stories**: View articles from different NYT sections (World, Arts, Science, Sports, etc.)
- **Section Filtering**: Switch between news sections with persistent selection
- **Advanced Filters**: Filter articles by location and keywords
- **Offline Capability**: Articles are cached locally for offline viewing
- **Persistent State**: App remembers your last selected section
- **Pull to Refresh**: Refresh articles with a simple pull-down gesture
- **Article Details**: View full article details with images and metadata
- **Responsive UI**: Clean, modern interface optimized for mobile devices

## 🏗️ Architecture

### Project Structure

```
news_app/
├── src/
│   ├── api/                    # API layer
│   │   ├── config.js          # API configuration and constants
│   │   ├── nytApi.js          # NYT API client with retry logic
│   │   └── index.js
│   ├── assets/                 # Static assets (images, fonts, etc.)
│   ├── components/             # Reusable UI components
│   │   ├── ArticleCard.js     # Article list item component
│   │   ├── SectionFilter.js   # Section selection component
│   │   ├── FilterDropdown.js  # Filter input component
│   │   ├── EmptyState.js      # Empty state component
│   │   ├── ErrorView.js       # Error display component
│   │   └── index.js
│   ├── hooks/                  # Custom React hooks
│   │   ├── useArticles.js     # Hook for articles management
│   │   ├── useNetworkStatus.js # Hook for network monitoring
│   │   └── index.js
│   ├── navigation/             # Navigation configuration
│   │   ├── RootNavigator.js   # Main navigation stack
│   │   └── index.js
│   ├── redux/                  # State management
│   │   ├── slices/
│   │   │   ├── articlesSlice.js    # Articles state
│   │   │   └── preferencesSlice.js # User preferences state
│   │   ├── store/
│   │   │   └── index.js       # Redux store configuration
│   │   └── index.js
│   ├── screens/                # Screen components
│   │   ├── HomeScreen.js      # Main feed screen
│   │   ├── ArticleDetailScreen.js # Article detail screen
│   │   └── index.js
│   ├── theme/                  # Theming
│   │   ├── colors.js          # Color palette
│   │   ├── typography.js      # Typography system
│   │   ├── spacing.js         # Spacing values
│   │   └── index.js
│   ├── utils/                  # Utility functions
│   │   ├── dateUtils.js       # Date formatting utilities
│   │   ├── filterUtils.js     # Article filtering utilities
│   │   └── index.js
│   ├── __tests__/              # Unit tests
│   │   ├── components/
│   │   ├── redux/
│   │   └── utils/
│   ├── App.js                  # Main App component
│   └── index.js                # Entry point
├── App.js                      # Root App.js (re-exports src/App.js)
├── package.json
└── README.md
```

### Technology Stack

- **React Native**: Mobile app framework
- **Expo**: Development platform and tools
- **Redux Toolkit**: State management with built-in best practices
- **Redux Persist**: State persistence for offline capability
- **React Navigation**: Navigation library
- **AsyncStorage**: Local storage for persistence
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.19.4 or higher recommended)
- npm or yarn
- Expo CLI (installed automatically)
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Expo Go app (for testing on physical devices)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd news_app
```

2. **Install dependencies**

```bash
npm install --legacy-peer-deps
```

3. **Configure NYT API Key**

Get your API key from [NYT Developer Portal](https://developer.nytimes.com/get-started)

Edit `src/api/config.js` and replace `YOUR_API_KEY_HERE` with your actual API key:

```javascript
export const API_CONFIG = {
  BASE_URL: "https://api.nytimes.com/svc/topstories/v2",
  API_KEY: "your-api-key",
  TIMEOUT: 10000,
};
```

### Running the App

**Start the development server:**

```bash
npm start
```

**Run on specific platforms:**

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🧪 Testing

### Run Unit Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Located in `src/__tests__/`
  - Component tests
  - Redux slice tests
  - Utility function tests

Tests cover:

- Date formatting utilities
- Filter utilities
- Redux state management
- Component rendering and interactions

## 📖 API Documentation

### NYT Top Stories API

This app uses the New York Times Top Stories API v2.

**Endpoint**: `https://api.nytimes.com/svc/topstories/v2/{section}.json`

**Available Sections**:

- home, world, arts, science, sports, opinion
- technology, business, politics, health, food
- travel, movies, theater, books, and more

**Rate Limits**: 5,000 requests per day (check NYT API documentation for current limits)

## 🎨 UI/UX Features

### Home Screen

- Section filter buttons (Home, World, Arts, Science, Sports, Opinion)
- Location filter dropdown with suggestions
- Keywords filter for searching article content
- Article list with images, titles, authors, and publish times
- Pull-to-refresh functionality
- Cache status indicator
- Empty states for no results
- Error handling with retry option

### Article Detail Screen

- Full-size article image with caption
- Article title and metadata
- Author information
- Publish time
- Article abstract
- Section tags
- "Read Full Article" button (opens in browser)
- Back button for navigation

## 🔄 Offline Capability

The app implements robust offline functionality:

1. **Caching**: Articles are automatically cached when fetched
2. **Persistence**: Redux state is persisted to AsyncStorage
3. **Cache Duration**: 5 minutes by default (configurable)
4. **Fallback**: If network fails, cached data is used automatically
5. **Retry Logic**: API requests retry up to 3 times with exponential backoff
6. **Section Memory**: App remembers last selected section across restarts

## 🎯 Assignment Requirements Checklist

- ✅ Display article list with top stories
- ✅ Allow user to open individual articles
- ✅ Switch between different sections (science, travel, sports, etc.)
- ✅ Filter articles by location
- ✅ Filter articles by description keywords
- ✅ Remember selected section (Redux Persist)
- ✅ Offline capability (caching, persistence, retry logic)
- ✅ Modern React (hooks, functional components)
- ✅ Styled components with theme system
- ✅ Comprehensive documentation
- ✅ Unit tests for utilities, Redux, and components

## 🛠️ Development

### Code Style

The project follows standard JavaScript/React Native conventions:

- Functional components with hooks
- JSDoc comments for documentation
- Modular file structure
- Clear separation of concerns

### State Management

**Redux Slices**:

- `articlesSlice`: Manages article data and API state
- `preferencesSlice`: Manages user preferences and filters

**Persistence**:

- Redux state is persisted using redux-persist
- AsyncStorage is used as the storage engine

### Custom Hooks

- `useArticles`: Manages article loading, caching, and filtering
- `useNetworkStatus`: Monitors network connectivity (placeholder)

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**

   - Ensure you've added your NYT API key in `src/api/config.js`
   - Verify the API key is valid on the NYT Developer Portal

2. **Dependency Installation Issues**

   - Use `npm install --legacy-peer-deps` flag
   - Clear node_modules and package-lock.json, then reinstall

3. **Metro Bundler Issues**

   - Clear cache: `npx expo start --clear`
   - Reset project: `rm -rf node_modules && npm install --legacy-peer-deps`

4. **iOS Build Issues**

   - Run `cd ios && pod install` if using bare workflow
   - Ensure Xcode is up to date

5. **Android Build Issues**
   - Ensure Android Studio and SDK tools are installed
   - Check ANDROID_HOME environment variable is set

## 📝 License

This project is created for educational purposes as part of a React Native assignment.

## 👤 Author

Created as a React Native assignment solution for building a news feed app with offline capabilities.

## 🙏 Acknowledgments

- New York Times for providing the Top Stories API
- React Native and Expo teams for excellent documentation
- Redux Toolkit for simplified state management

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review NYT API documentation
3. Check React Native and Expo documentation

---

**Happy Coding! 📱**
