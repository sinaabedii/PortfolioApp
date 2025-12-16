import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

const fontConfig = {
  displayLarge: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 57 },
  displayMedium: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 45 },
  displaySmall: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 36 },
  headlineLarge: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 32 },
  headlineMedium: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 28 },
  headlineSmall: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 24 },
  titleLarge: { fontFamily: 'System', fontWeight: '500' as const, fontSize: 22 },
  titleMedium: { fontFamily: 'System', fontWeight: '500' as const, fontSize: 16 },
  titleSmall: { fontFamily: 'System', fontWeight: '500' as const, fontSize: 14 },
  bodyLarge: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 16 },
  bodyMedium: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 14 },
  bodySmall: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 12 },
  labelLarge: { fontFamily: 'System', fontWeight: '500' as const, fontSize: 14 },
  labelMedium: { fontFamily: 'System', fontWeight: '500' as const, fontSize: 12 },
  labelSmall: { fontFamily: 'System', fontWeight: '500' as const, fontSize: 11 },
};

const customColors = {
  primary: '#6200EE',
  primaryContainer: '#BB86FC',
  secondary: '#03DAC6',
  secondaryContainer: '#018786',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#CF6679',
  info: '#2196F3',
};

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    onBackground: '#1C1B1F',
    onSurface: '#1C1B1F',
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3DarkTheme.colors,
    ...customColors,
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2D2D2D',
    onBackground: '#E6E1E5',
    onSurface: '#E6E1E5',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};
