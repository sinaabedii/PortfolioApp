import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import { store, persistor } from '@store/index';
import { apolloClient } from '@services/graphql/client';
import { RootNavigator } from '@navigation/RootNavigator';
import { ThemeProvider } from '@context/ThemeContext';
import { useTheme } from '@hooks/useTheme';
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { useOfflineSync } from '@hooks/useOfflineSync';
import { SplashScreen } from '@screens/SplashScreen';
import '@i18n/index';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const AppContent: React.FC = () => {
  const { theme, isDark } = useTheme();
  useNetworkStatus();
  useOfflineSync();

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
      <RootNavigator />
    </PaperProvider>
  );
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <ApolloProvider client={apolloClient}>
            <SafeAreaProvider>
              <ThemeProvider>
                <AppContent />
              </ThemeProvider>
            </SafeAreaProvider>
          </ApolloProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
};

export default App;
