# Portfolio App

![CI](https://github.com/username/PortfolioApp/workflows/CI/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.73-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

A production-ready React Native application demonstrating modern mobile development best practices.

## Features

- **Authentication** - Login, Register, Forgot Password with biometric support
- **Real-time Chat** - WebSocket-powered messaging with typing indicators
- **Offline-First** - Sync queue with automatic retry on reconnection
- **Dark/Light Theme** - System detection with manual override
- **Multi-language** - i18n support (EN, ES, FR)
- **State Management** - Redux Toolkit + RTK Query + Context API
- **GraphQL** - Apollo Client with subscriptions

## Architecture

```
src/
├── components/       # Reusable UI components
├── screens/          # Screen components
├── navigation/       # React Navigation setup
├── store/            # Redux store, slices, API
├── services/         # API, Socket, GraphQL clients
├── hooks/            # Custom React hooks
├── context/          # React Context providers
├── theme/            # Theme configuration
├── i18n/             # Internationalization
├── types/            # TypeScript definitions
├── constants/        # App constants
└── utils/            # Utility functions
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Native CLI 0.73 |
| Language | TypeScript (strict) |
| State | Redux Toolkit, RTK Query |
| Navigation | React Navigation v6 |
| UI | React Native Paper |
| Animations | Reanimated v3 |
| Lists | FlashList |
| API | Axios, Apollo Client |
| Real-time | Socket.io |
| Storage | MMKV, Redux Persist |
| Testing | Jest, RNTL, Detox |
| CI/CD | GitHub Actions |

## Getting Started

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (iOS) / Android Studio (Android)
- CocoaPods (iOS)

### Installation

```bash
# Clone repository
git clone https://github.com/username/PortfolioApp.git
cd PortfolioApp

# Install dependencies
npm install

# iOS only
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on device/simulator
npm run ios     # iOS
npm run android # Android
```

### Environment Setup

Create `.env` file:

```env
API_BASE_URL=http://localhost:3000/api
SOCKET_URL=http://localhost:3000
GRAPHQL_URL=http://localhost:3000/graphql
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run ios` | Run on iOS |
| `npm run android` | Run on Android |
| `npm test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript check |
| `npm run e2e:test` | Run E2E tests |

## Architecture Decisions

### State Management Strategy

- **Redux Toolkit**: Global app state (auth, settings, chat)
- **RTK Query**: Server state with caching
- **Context API**: Theme, simple local state

### Offline-First Approach

1. Actions queued when offline
2. Automatic sync on reconnection
3. Retry with exponential backoff
4. Conflict resolution strategies

### Performance Optimizations

- Hermes engine enabled
- FlashList for virtualized lists
- Image caching with FastImage
- Memoization patterns
- Code splitting

## Testing

```bash
# Unit tests
npm test

# Coverage report
npm run test:coverage

# E2E tests (Detox)
npm run e2e:build
npm run e2e:test
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.
