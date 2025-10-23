# NYT News Feed App

A React Native mobile application for browsing New York Times top stories with offline capability, built with Expo, Redux Toolkit, and React Navigation.

## 📱 Features

- **Browse Top Stories**: View articles from different NYT sections (World, Arts, Science, Sports, etc.)
- **Section Filtering**: Switch between news sections with persistent selection
- **Advanced Filters**: Filter articles by location and keywords using dropdown selectors
- **Offline Capability**: Articles are cached locally for offline viewing
- **Persistent State**: App remembers your last selected section
- **Pull to Refresh**: Refresh articles with a simple pull-down gesture
- **Article Details**: View full article details with images and metadata
- **Image Caching**: Automatic disk caching for article images using expo-image
- **Shimmer Loading Effect**: Modern skeleton screens with animated shimmer during data loading
- **Responsive UI**: Clean, modern interface optimized for mobile devices

## 🏗️ Architecture

### Project Structure

```
news_app/
├── .env                        # Environment variables (API keys) - COMMITTED FOR TESTING
├── .env.example                # Environment variables template
├── src/
│   ├── api/                    # API layer
│   │   ├── config.js          # API configuration (reads from .env)
│   │   ├── nytApi.js          # NYT API client with retry logic
│   │   └── index.js
│   ├── types/                  # TypeScript declarations
│   │   └── env.d.ts           # Environment variables types
│   ├── assets/                 # Static assets (images, fonts, etc.)
│   ├── components/             # Reusable UI components
│   │   ├── ArticleCard.js     # Article list item component
│   │   ├── ArticleCardSkeleton.js # Shimmer loading skeleton for article cards
│   │   ├── ArticleDetailSkeleton.js # Shimmer loading skeleton for article details
│   │   ├── SectionFilter.js   # Section selection component
│   │   ├── FilterDropdown.js  # Dropdown filter component
│   │   ├── EmptyState.js      # Empty state component
│   │   ├── ErrorView.js       # Error display component
│   │   ├── Shimmer.js         # Base shimmer animation component
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
- **Expo Image**: Advanced image component with caching and performance optimizations
- **Redux Toolkit**: State management with built-in best practices
- **Redux Persist**: State persistence for offline capability
- **React Navigation**: Navigation library
- **AsyncStorage**: Local storage for persistence
- **react-native-dotenv**: Environment variables management
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

3. **Environment Variables Setup**

**✅ Pre-configured for immediate use!**

This project includes a `.env` file with a working NYT API key for client testing purposes.

**⚠️ IMPORTANT NOTE**: For this assignment, the `.env` file is intentionally committed to the repository for easy client testing. In production applications, **never commit API keys or `.env` files** to version control.

**If you want to use your own API key:**

1. Get your API key from [NYT Developer Portal](https://developer.nytimes.com/get-started)
2. Update the `.env` file in the project root:

```env
# .env file
NYT_API_KEY=your-api-key-here
API_BASE_URL=https://api.nytimes.com/svc/topstories/v2
API_TIMEOUT=10000
```

3. Restart the Metro bundler for changes to take effect:

```bash
# Clear cache and restart
npx expo start --clear
```

**Environment Variables Configuration:**

- `NYT_API_KEY` - Your New York Times API key
- `API_BASE_URL` - NYT Top Stories API base URL
- `API_TIMEOUT` - API request timeout in milliseconds

**📖 For detailed environment setup information, see [ENV_SETUP.md](./ENV_SETUP.md)**

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
- Location filter dropdown with predefined options from articles
- Keywords filter dropdown with predefined options from articles
- Article list with images, titles, authors, and publish times
- Pull-to-refresh functionality
- Cache status indicator
- Empty states for no results
- Error handling with retry option
- Shimmer loading skeletons during data fetch

### Article Detail Screen

- Full-size article image with caption
- Article title and metadata
- Author information
- Publish time
- Article abstract
- Section tags
- "Read Full Article" button (opens in browser)
- Back button for navigation
- Smooth shimmer transition on page load

### Shimmer Loading Effect

The app implements modern skeleton screens with animated shimmer effects for enhanced user experience:

**Features:**

- **Content-shaped placeholders**: Shimmer elements match the actual content layout
- **Smooth animations**: Pulsing opacity effect (0.3 to 0.7) with 1-second cycles
- **Consistent experience**: Shows during initial load, section changes, and screen transitions
- **Professional appearance**: Modern loading pattern similar to Facebook, LinkedIn, and YouTube

**Implementation:**

- `Shimmer.js` - Base shimmer component with configurable dimensions and border radius
- `ArticleCardSkeleton.js` - Skeleton for article list items (shows 5 cards)
- `ArticleDetailSkeleton.js` - Skeleton for article detail screen
- Uses React Native's Animated API for smooth performance
- No spinners or loading indicators - only content-shaped shimmer effects

**When Shimmer Appears:**

- Initial app load
- Switching between news sections (Arts, Science, Sports, etc.)
- Navigating to article details
- Any time new data is being fetched from the API

### Image Caching

The app implements intelligent image caching for optimal performance and offline capability:

**Features:**

- **Automatic disk caching**: Images are cached to disk using expo-image
- **Memory management**: Efficient memory usage with automatic cleanup
- **Smooth transitions**: 200ms fade-in effect for article cards, 300ms for detail screens
- **Priority loading**: Detail screen images load with high priority
- **Persistent cache**: Images remain available offline after first load

**Implementation:**

- Uses `expo-image` library for advanced caching capabilities
- `cachePolicy="disk"` - Images persist across app restarts
- Smooth fade-in transitions for better UX
- Fallback placeholder for images that fail to load

**Benefits:**

- **Faster loading**: Cached images load instantly on subsequent views
- **Reduced data usage**: Images are only downloaded once
- **Offline availability**: View previously loaded articles with images offline
- **Better performance**: Native image caching is more efficient than JS solutions

## 🔄 Offline Capability

The app implements robust offline functionality:

1. **Article Caching**: Articles are automatically cached when fetched
2. **Image Caching**: Article images are cached to disk and remain available offline
3. **Persistence**: Redux state is persisted to AsyncStorage
4. **Cache Duration**: 5 minutes by default (configurable)
5. **Fallback**: If network fails, cached data and images are used automatically
6. **Retry Logic**: API requests retry up to 3 times with exponential backoff
7. **Section Memory**: App remembers last selected section across restarts

## 🎯 Assignment Requirements Checklist

- ✅ Display article list with top stories
- ✅ Allow user to open individual articles
- ✅ Switch between different sections (science, travel, sports, etc.)
- ✅ Filter articles by location (dropdown with exact match)
- ✅ Filter articles by description keywords (dropdown with exact match)
- ✅ Remember selected section (Redux Persist)
- ✅ Offline capability (caching, persistence, retry logic)
- ✅ Image caching (disk caching with expo-image)
- ✅ Modern React (hooks, functional components)
- ✅ Styled components with theme system
- ✅ Shimmer loading effects (modern skeleton screens)
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

## 🔐 Security Note

**⚠️ About the .env file:**

This project intentionally includes a `.env` file with an API key in the repository for easy client testing and evaluation purposes. This is **NOT a recommended practice** for production applications.

**In production applications, you should:**

- Add `.env` to your `.gitignore` file
- Never commit API keys or sensitive credentials to version control
- Use environment-specific variables or secret management services
- Provide a `.env.example` file as a template without actual credentials

This exception is made solely for assignment submission and client testing convenience.

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**

   - The project includes a pre-configured API key in the `.env` file
   - If you're using your own key, ensure it's valid on the NYT Developer Portal
   - After changing the `.env` file, restart Metro bundler: `npx expo start --clear`

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
