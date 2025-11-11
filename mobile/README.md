# PBM Knowledge Hub - Mobile Application

React Native mobile application built with Expo for iOS and Android.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development server:
```bash
npm start
```

## Running the App

### Development

```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Building for Production

```bash
# Build for Android
npm run build:android

# Build for iOS
npm run build:ios
```

## Features

- **Cross-Platform** - iOS, Android, and Web
- **Expo** - Managed workflow with easy updates
- **Camera Integration** - For HRV biofeedback
- **Offline Support** - Local data caching
- **Push Notifications** - Stay connected
- **Dark/Light Theme** - Automatic theme switching
- **TypeScript** - Type-safe development

## Project Structure

```
mobile/
├── src/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation setup
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   ├── services/         # API and services
│   └── utils/            # Utility functions
├── assets/               # Images, fonts, etc.
│   ├── images/
│   └── fonts/
├── App.tsx              # Entry point
├── app.json             # Expo configuration
├── package.json
└── tsconfig.json
```

## Core Screens

- **Home** - Dashboard with category navigation
- **Content Library** - Browse educational content
- **Article Detail** - Read articles and research papers
- **HRV Session** - Camera-based biofeedback
- **Wellness Tracker** - Daily mood and symptom logging
- **Forum** - Community discussions
- **Profile** - User settings and progress

## Camera Permissions

The app requires camera access for HRV biofeedback:
- iOS: Set in Info.plist (configured in app.json)
- Android: Declared in AndroidManifest.xml

## Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

## Deployment

### Using EAS (Expo Application Services)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Build:
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

4. Submit to stores:
```bash
# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

### OTA Updates

```bash
eas update --branch production
```

## Environment Variables

See `.env.example` for all available environment variables.

## Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### iOS build issues
```bash
cd ios && pod install && cd ..
```

### Android build issues
```bash
cd android && ./gradlew clean && cd ..
```

## License

PROPRIETARY - Neurofeedback Luxembourg
