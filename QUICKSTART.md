# Quick Start Guide

Get the NYT News Feed app running in under 5 minutes!

## ⚡ Fast Track

```bash
# 1. Navigate to project
cd news_app

# 2. Install dependencies (already done)
npm install --legacy-peer-deps

# 3. Add your NYT API key
# Edit src/api/config.js and replace YOUR_API_KEY_HERE

# 4. Start the app
npm start

# 5. Press 'i' for iOS, 'a' for Android, or 'w' for web
```

## 📱 Platform-Specific Launch

### iOS (Mac only)
```bash
npm run ios
```
Opens in iOS Simulator (Xcode required)

### Android
```bash
npm run android
```
Opens in Android Emulator (Android Studio required)

### Web
```bash
npm run web
```
Opens in your default browser

## 🔑 Getting Your API Key (2 minutes)

1. Go to https://developer.nytimes.com/
2. Sign up or login
3. Create a new app
4. Enable "Top Stories API"
5. Copy your API key
6. Paste it in `src/api/config.js`:
   ```javascript
   API_KEY: 'your-key-here',
   ```

See [API_SETUP.md](API_SETUP.md) for detailed instructions.

## 🎯 What to Test

### Basic Features
- ✅ Browse different news sections (Home, World, Arts, etc.)
- ✅ Filter by location (e.g., "Paris", "New York")
- ✅ Filter by keywords (e.g., "climate", "technology")
- ✅ Tap an article to view details
- ✅ Pull down to refresh articles

### Offline Features
- ✅ Close the app and reopen (should remember section)
- ✅ Turn off WiFi and refresh (should show cached articles)
- ✅ Turn WiFi back on and refresh (should fetch new articles)

## 📂 Project Structure (Quick Overview)

```
news_app/
├── src/
│   ├── screens/         # HomeScreen, ArticleDetailScreen
│   ├── components/      # ArticleCard, Filters, etc.
│   ├── redux/          # State management
│   ├── api/            # NYT API client
│   ├── navigation/     # React Navigation setup
│   ├── theme/          # Colors, typography, spacing
│   ├── hooks/          # Custom hooks
│   └── utils/          # Utility functions
├── App.js              # Root component
└── package.json        # Dependencies and scripts
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🛠️ Troubleshooting

### "API request failed: Unauthorized"
➡️ Check your API key in `src/api/config.js`

### "Unable to resolve module"
➡️ Run: `npm install --legacy-peer-deps`

### Metro bundler issues
➡️ Run: `npx expo start --clear`

### iOS build fails
➡️ Make sure Xcode is installed and up to date

### Android build fails
➡️ Make sure Android Studio and SDK are installed

## 📚 Next Steps

1. ✅ **Read the README**: [README.md](README.md) - Full documentation
2. 🏗️ **Understand Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
3. 🧪 **Learn Testing**: [TESTING.md](TESTING.md)
4. 🤝 **Contribute**: [CONTRIBUTING.md](CONTRIBUTING.md)

## 🎨 Customization Ideas

Want to make it your own?

### Change Colors
Edit `src/theme/colors.js`:
```javascript
export const colors = {
  primary: '#2D5BFF',  // Change this!
  // ...
};
```

### Add More Sections
Edit `src/api/config.js`:
```javascript
export const DEFAULT_SECTIONS = [
  'home', 'world', 'arts', 
  'technology', 'business', // Add more!
];
```

### Change Cache Duration
Edit `src/hooks/useArticles.js`:
```javascript
const CACHE_DURATION = 5 * 60 * 1000; // Change this!
```

## 🚀 Deployment (Future)

### Build for Production

**iOS**:
```bash
eas build --platform ios
```

**Android**:
```bash
eas build --platform android
```

**Web**:
```bash
npm run web
# Then deploy the web-build/ folder
```

See [Expo EAS Build Docs](https://docs.expo.dev/build/introduction/) for details.

## 💡 Tips

- **Hot Reload**: Save any file to see changes instantly
- **Shake Device**: Open developer menu on physical device
- **Cmd+D (iOS) / Cmd+M (Android)**: Developer menu in simulator
- **Pull to Refresh**: Get latest articles
- **Cache Indicator**: Yellow banner shows when using cached data

## 🎉 You're Ready!

The app is now running. Happy coding! 

Need help? Check out:
- 📖 [Full README](README.md)
- 🏗️ [Architecture Guide](ARCHITECTURE.md)
- 🧪 [Testing Guide](TESTING.md)
- 🤝 [Contributing Guide](CONTRIBUTING.md)

