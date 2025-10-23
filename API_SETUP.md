# NYT API Setup Guide

This guide will help you set up your New York Times API key for the News Feed app.

## Step 1: Create NYT Developer Account

1. Go to [NYT Developer Portal](https://developer.nytimes.com/)
2. Click on "Get Started" or "Sign Up"
3. Create an account or sign in with your existing NYT account

## Step 2: Create an App

1. Once logged in, go to your [Apps page](https://developer.nytimes.com/my-apps)
2. Click "Create App" or "+ New App"
3. Fill in the app details:
   - **App Name**: News Feed App (or any name you prefer)
   - **Description**: Mobile app for browsing NYT top stories
4. Enable the **Top Stories API** by checking the box
5. Click "Save" or "Create"

## Step 3: Get Your API Key

1. After creating the app, you'll see your API key
2. Copy the API key (it will look something like: `abcd1234efgh5678ijkl9012mnop3456`)
3. Keep this key secure and don't share it publicly

## Step 4: Configure the App

1. Open the project in your code editor
2. Navigate to `src/api/config.js`
3. Find this line:
   ```javascript
   API_KEY: 'YOUR_API_KEY_HERE',
   ```
4. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   API_KEY: 'abcd1234efgh5678ijkl9012mnop3456',
   ```
5. Save the file

## Step 5: Test the API

1. Start the development server:
   ```bash
   npm start
   ```
2. Run the app on your device or simulator
3. You should see articles loading on the home screen
4. If you see an error, check the following:
   - API key is correctly copied (no extra spaces)
   - Top Stories API is enabled in your NYT app
   - You haven't exceeded the rate limit (5,000 requests/day)

## API Endpoints Used

The app uses the Top Stories API v2:

```
https://api.nytimes.com/svc/topstories/v2/{section}.json?api-key={your-api-key}
```

Available sections:
- home
- world
- arts
- science
- sports
- opinion
- technology
- business
- politics
- health
- food
- travel
- movies
- theater
- books
- and more...

## Rate Limits

- **Requests per day**: 5,000
- **Requests per minute**: 10

The app implements:
- Request caching (5-minute cache duration)
- Automatic retry with exponential backoff
- Offline capability with cached data

## Troubleshooting

### Error: "API request failed: Unauthorized"
- Check that your API key is correct
- Ensure there are no extra spaces or characters
- Verify the API key is active in your NYT developer account

### Error: "API request failed: 429 Too Many Requests"
- You've exceeded the rate limit
- Wait a few minutes and try again
- The app will use cached data automatically

### Error: "Network request failed"
- Check your internet connection
- The app will use cached data if available
- Try pull-to-refresh when connection is restored

## Security Best Practices

1. **Never commit your API key to version control**
   - The API key in `config.js` is for development only
   - For production, use environment variables

2. **Use environment variables for production**
   ```javascript
   // In production, use:
   API_KEY: process.env.NYT_API_KEY || 'YOUR_API_KEY_HERE',
   ```

3. **Rotate your API key regularly**
   - You can generate a new API key in your NYT developer account
   - Update the key in your app configuration

## Additional Resources

- [NYT Developer Portal](https://developer.nytimes.com/)
- [Top Stories API Documentation](https://developer.nytimes.com/docs/top-stories-product/1/overview)
- [API FAQ](https://developer.nytimes.com/faq)

## Support

If you encounter issues:
1. Check the [NYT API Status Page](https://developer.nytimes.com/)
2. Review the [API Documentation](https://developer.nytimes.com/docs/top-stories-product/1/overview)
3. Contact NYT Developer Support through their portal

