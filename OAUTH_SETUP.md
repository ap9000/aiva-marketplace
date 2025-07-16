# OAuth Setup Guide

## Current Development Mode

The app is currently configured to use **mock authentication** for testing. This allows you to test the complete user flow without setting up real OAuth credentials.

### Testing the Mock Auth Flow:

1. **Start the app**: `npm run ios`
2. **Click "Continue with Google"** or **"Continue with Apple"**
3. The app will simulate OAuth login and take you to the User Type Selection screen
4. Mock user data:
   - Google: John Doe (john.doe@gmail.com)
   - Apple: Jane Smith (jane.smith@icloud.com)

### Switching to Production OAuth

To use real OAuth, change `DEV_MODE` to `false` in `/src/features/auth/screens/AuthMethodScreen.tsx`:

```typescript
const DEV_MODE = false; // Change to false for real OAuth
```

## Setting Up Real OAuth

### Google OAuth Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API

2. **Create OAuth 2.0 Credentials**
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "iOS" for iOS app, "Web" for web testing
   - Add bundle identifier: `com.yourcompany.aivamarketplace`
   - Add redirect URI: `aivamarketplace://redirect`

3. **Update the app**
   ```typescript
   const GOOGLE_CLIENT_ID = 'your-actual-client-id.apps.googleusercontent.com';
   ```

### Apple Sign In Setup

1. **Apple Developer Account Required** ($99/year)

2. **Configure in Apple Developer Portal**
   - Enable Sign In with Apple capability
   - Create Service ID for web
   - Configure domains and return URLs

3. **Update Xcode Project**
   - Add Sign In with Apple capability
   - Update provisioning profiles

### Environment Variables (Recommended)

Create `.env` file:
```
GOOGLE_CLIENT_ID=your-google-client-id
APPLE_SERVICE_ID=your-apple-service-id
```

Update code to use env vars:
```typescript
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'mock-client-id';
```

## Testing Checklist

- [ ] Mock auth flow works (current setup)
- [ ] User type selection appears after OAuth
- [ ] Client onboarding flow completes
- [ ] VA application flow completes
- [ ] Profile data persists correctly

## Common Issues

1. **Redirect URI mismatch**: Ensure the URI in Google Console matches exactly
2. **Bundle ID mismatch**: Check app.json and Google Console match
3. **Network errors**: Check if running on physical device vs simulator

## Security Notes

- Never commit real OAuth credentials
- Use environment variables for production
- Implement proper token refresh logic
- Add server-side validation for OAuth tokens