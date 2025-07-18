# AIVA Marketplace - Project Context for Claude

## Project Overview
AIVA Marketplace is a React Native (Expo) application that connects clients with Virtual Assistants. The app features modern authentication with SSO, guest browsing, and a beautiful animated UI.

## Tech Stack
- **Framework**: React Native with Expo (SDK 53)
- **React**: Version 19.0.0
- **React Native**: Version 0.79.5
- **Navigation**: React Navigation v7
- **State Management**: Redux Toolkit
- **Authentication**: Expo Auth Session (Google/Apple SSO)
- **Animations**: React Native Reanimated 3
- **UI Components**: Custom components with React Native Paper
- **Styling**: Native StyleSheet with theme system (no Tailwind/NativeWind)
- **Architecture**: New Architecture enabled (`newArchEnabled: true`)

## Key Features Implemented
1. **Modern Authentication Flow**
   - Google Sign In (SSO)
   - Apple Sign In (iOS)
   - Guest browsing mode
   - Traditional email/password option

2. **Animated Welcome Screen**
   - Gradient backgrounds with animations
   - Floating logo effect
   - Smooth entrance animations
   - Glassmorphism design elements

3. **Guest Mode**
   - Browse without registration
   - Redux state management for guest users
   - Conversion prompts for advanced features

## Project Structure
```
AIVAMarketplace/
├── src/
│   ├── features/         # Feature-based modules
│   │   ├── auth/        # Authentication flows
│   │   ├── marketplace/ # VA browsing and profiles
│   │   ├── messaging/   # Chat functionality
│   │   ├── profile/     # User profiles
│   │   └── search/      # Search functionality
│   ├── navigation/      # React Navigation setup
│   ├── shared/          # Shared components and utilities
│   ├── store/           # Redux store configuration
│   └── theme/           # Design system and theming
├── assets/              # Images and static assets
├── App.tsx             # Root component
├── app.json            # Expo configuration
└── package.json        # Dependencies
```

## Important Commands
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

## Environment Setup
1. **OAuth Configuration**
   - Replace `'your-google-client-id.apps.googleusercontent.com'` in `AuthMethodScreen.tsx`
   - Configure OAuth redirect URIs for production
   - URL scheme: `aivamarketplace://`

2. **Testing Auth Flows**
   - Guest mode works immediately
   - SSO requires valid OAuth credentials
   - Email auth connects to mock API

## Current Status
- ✅ Modern authentication UI implemented
- ✅ Guest browsing enabled
- ✅ Animations and transitions working
- ✅ Upgraded to React 19 and latest Expo SDK
- ✅ Converted from Tailwind/NativeWind to native StyleSheet
- ✅ Fixed Babel plugin configuration errors
- ✅ New Architecture enabled for better performance
- ⚠️ OAuth credentials need configuration
- ⚠️ Backend API integration pending

## Design Principles
- **Mobile-first**: Optimized for mobile devices
- **Accessibility**: Following React Native accessibility guidelines
- **Performance**: Using React Native's New Architecture
- **UX Laws**: Following Hick's Law, Jakob's Law for intuitive design

## Recent Updates (2025-07-18)
1. **React 19 Upgrade**
   - Updated from React 18.3.1 to 19.0.0
   - Updated React Native to 0.79.5
   - Updated all type definitions to match

2. **Styling System Migration**
   - Removed NativeWind and Tailwind CSS
   - Converted all components to use StyleSheet
   - Fixed Babel plugin error: ".plugins is not a valid Plugin property"
   - Removed dependencies: `nativewind`, `tailwindcss`, `class-variance-authority`, `clsx`

3. **Configuration Updates**
   - Enabled New Architecture in app.json
   - Updated TypeScript configuration
   - Fixed Metro bundler configuration

## Known Issues & TODOs
1. Configure real OAuth credentials
2. Implement backend API integration
3. Add conversion prompts for guest users
4. Complete VA profile features
5. Implement real-time messaging
6. Minor TypeScript errors in some components (doesn't affect functionality)

## Development Tips
- Always test on both iOS and Android
- Use the Expo Go app for quick testing
- Check console for Redux state changes
- Animations may behave differently on older devices

## Key Files to Know
- `/src/features/auth/screens/WelcomeScreen.tsx` - Main entry point with animations
- `/src/features/auth/store/authSlice.ts` - Authentication state management
- `/src/navigation/RootNavigator.tsx` - Navigation logic including guest mode
- `/src/theme/` - Design system configuration
- `/src/components/ui/` - Core UI components (Button, Card, Input, etc.)
- `/babel.config.js` - Babel configuration (simplified, no NativeWind)
- `/metro.config.js` - Metro bundler configuration

## Git Workflow
- Main branch: `main`
- Feature branches: `feature/[feature-name]`
- Commit style: Conventional commits
- Always test before committing

## Troubleshooting

### Common Issues
1. **Babel Plugin Errors**
   - Already fixed by removing NativeWind
   - If you see ".plugins is not a valid Plugin property", check babel.config.js

2. **TypeScript Errors**
   - Most are related to removed className props (already fixed)
   - Remaining errors don't prevent the app from running

3. **Metro Bundler Issues**
   - Run `npx expo start --clear` to clear cache
   - Delete node_modules and reinstall if needed

### Dependencies
Key dependencies and their versions:
- expo: ~53.0.17
- react: 19.0.0
- react-native: 0.79.5
- @types/react: ~19.0.10
- react-navigation: v7
- react-native-reanimated: 3.17.5

---
Last updated: 2025-07-18