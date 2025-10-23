# Setup Instructions

Complete step-by-step guide to get the NYT News Feed app running.

## Prerequisites Check

Before starting, ensure you have:

- ✅ Node.js v20.19.4+ installed
  ```bash
  node --version
  ```

- ✅ npm or yarn installed
  ```bash
  npm --version
  ```

- ✅ Git installed (for version control)
  ```bash
  git --version
  ```

## Step 1: Project Setup ✅ COMPLETED

The project has been created and all dependencies are installed!

**What was done:**
- ✅ Created Expo React Native app
- ✅ Installed all required dependencies
- ✅ Created complete folder structure
- ✅ Set up Redux store with persistence
- ✅ Configured React Navigation
- ✅ Created all components and screens
- ✅ Added comprehensive tests
- ✅ Written complete documentation

## Step 2: Configure NYT API Key ⚠️ REQUIRED

This is the ONLY step you need to complete to run the app!

### Get Your API Key

1. Go to [https://developer.nytimes.com/](https://developer.nytimes.com/)
2. Click "Get Started" or "Sign Up"
3. Create an account or log in
4. Go to "My Apps" or "Apps"
5. Click "Create App" or "+ New App"
6. Fill in the details:
   - **Name**: News Feed App
   - **Description**: Mobile app for browsing NYT top stories
7. **Enable the "Top Stories API"** checkbox
8. Click "Create" or "Save"
9. Copy your API key

### Add API Key to the App

1. Open the project in your code editor:
   ```bash
   cd /Users/abc/Projects/news_app
   code .  # or open with your preferred editor
   ```

2. Navigate to `src/api/config.js`

3. Find this line (line 14):
   ```javascript
   API_KEY: 'YOUR_API_KEY_HERE',
   ```

4. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   API_KEY: 'abcd1234efgh5678ijkl9012mnop3456',
   ```

5. Save the file

✅ That's it! API is now configured.

## Step 3: Run the App

### Option A: Expo Go (Easiest - Recommended)

1. Install Expo Go app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:
   ```bash
   cd /Users/abc/Projects/news_app
   npm start
   ```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

4. The app will load on your phone!

### Option B: iOS Simulator (Mac Only)

1. Install Xcode from the Mac App Store (if not installed)

2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```

3. Run the app:
   ```bash
   cd /Users/abc/Projects/news_app
   npm run ios
   ```

4. The app will open in iOS Simulator

### Option C: Android Emulator

1. Install Android Studio

2. Set up an Android Virtual Device (AVD):
   - Open Android Studio
   - Tools → AVD Manager
   - Create Virtual Device
   - Choose a device (e.g., Pixel 5)
   - Download and select a system image
   - Finish

3. Start the emulator from Android Studio

4. Run the app:
   ```bash
   cd /Users/abc/Projects/news_app
   npm run android
   ```

5. The app will open in the emulator

### Option D: Web Browser

1. Run the app in web mode:
   ```bash
   cd /Users/abc/Projects/news_app
   npm run web
   ```

2. The app will open in your default browser

## Step 4: Test the App

Once the app is running, test these features:

### ✅ Basic Navigation
1. The home screen should show "NYT News Feed" header
2. You should see section filters (Home, World, Arts, etc.)
3. Articles should load and display

### ✅ Section Switching
1. Tap different section buttons (e.g., "World", "Science")
2. Articles should change to match the section
3. Loading indicator should appear briefly

### ✅ Filtering
1. Tap the "LOCATION" filter
2. Type a location (e.g., "Paris", "New York")
3. Articles should filter to show only those locations

4. Tap the "KEYWORDS" filter
5. Type keywords (e.g., "climate", "technology")
6. Articles should filter by keywords

### ✅ Article Details
1. Tap any article card
2. Should navigate to article detail screen
3. Should show full image, title, author, and content
4. Tap "BACK" to return to home

### ✅ Pull to Refresh
1. Pull down on the article list
2. Should show loading indicator
3. Articles should refresh

### ✅ Offline Mode
1. Close the app completely
2. Reopen the app
3. Should show cached articles
4. Should remember your last selected section

## Step 5: Run Tests (Optional)

Verify everything works with the test suite:

```bash
cd /Users/abc/Projects/news_app
npm test
```

All tests should pass! ✅

## Troubleshooting

### Issue: "API request failed: Unauthorized"

**Solution**: Check your API key
1. Verify you copied the entire key
2. Check for extra spaces
3. Ensure Top Stories API is enabled
4. Try generating a new key

### Issue: "Unable to resolve module"

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue: Metro bundler not starting

**Solution**: Clear cache
```bash
npx expo start --clear
```

### Issue: iOS build fails

**Solution**: 
1. Update Xcode to latest version
2. Run: `sudo xcode-select --switch /Applications/Xcode.app`
3. Accept Xcode license: `sudo xcodebuild -license accept`

### Issue: Android build fails

**Solution**:
1. Open Android Studio
2. Check SDK is installed (Tools → SDK Manager)
3. Ensure ANDROID_HOME environment variable is set
4. Restart Android Studio and emulator

### Issue: "Network request failed"

**Solution**:
1. Check internet connection
2. Check API key is correct
3. Try pull-to-refresh
4. The app will show cached articles if available

## Next Steps

Now that the app is running:

1. 📖 **Read the documentation**:
   - [README.md](README.md) - Complete overview
   - [ARCHITECTURE.md](ARCHITECTURE.md) - How it works
   - [TESTING.md](TESTING.md) - Testing guide

2. 🎨 **Customize the app**:
   - Change colors in `src/theme/colors.js`
   - Add more sections in `src/api/config.js`
   - Modify cache duration in `src/hooks/useArticles.js`

3. 🧪 **Add features**:
   - Bookmarks/favorites
   - Dark mode
   - Search history
   - Share functionality

4. 🚀 **Deploy the app**:
   - See [Expo EAS Build](https://docs.expo.dev/build/introduction/)
   - Build for iOS and Android
   - Submit to app stores

## Project Structure Quick Reference

```
news_app/
├── src/
│   ├── screens/         👁️  HomeScreen, ArticleDetailScreen
│   ├── components/      🧩  ArticleCard, Filters, etc.
│   ├── redux/          🔄  State management
│   ├── api/            🌐  NYT API client
│   ├── navigation/     🧭  React Navigation
│   ├── theme/          🎨  Colors, fonts, spacing
│   ├── hooks/          🎣  Custom hooks
│   ├── utils/          🛠️  Helper functions
│   └── __tests__/      🧪  Unit tests
└── Documentation/       📚  7 guide files
```

## Commands Reference

```bash
# Development
npm start                 # Start Expo dev server
npm run ios              # Run on iOS simulator
npm run android          # Run on Android emulator
npm run web              # Run in web browser

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Maintenance
npm install --legacy-peer-deps  # Install dependencies
npx expo start --clear          # Clear cache and start
npm run lint                     # Run linter
```

## Support

Need help?
1. Check [README.md](README.md)
2. Review [TROUBLESHOOTING section](README.md#-troubleshooting)
3. Read [API_SETUP.md](API_SETUP.md)
4. Check [NYT API Status](https://developer.nytimes.com/)

## Success! 🎉

If you see articles loading on your device, congratulations! 

The app is now:
- ✅ Running successfully
- ✅ Connected to NYT API
- ✅ Loading and displaying articles
- ✅ Ready for testing and development

**Happy coding!** 📱

