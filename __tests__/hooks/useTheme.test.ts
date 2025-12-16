import { renderHook } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useTheme } from '@hooks/useTheme';
import settingsReducer from '@store/slices/settingsSlice';
import { lightTheme, darkTheme } from '@theme/index';
import React from 'react';

jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  useColorScheme: jest.fn(() => 'light'),
}));

const createWrapper = (themeSetting: 'light' | 'dark' | 'system') => {
  const store = configureStore({
    reducer: { settings: settingsReducer },
    preloadedState: {
      settings: { theme: themeSetting, language: 'en', notifications: true, biometricEnabled: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(Provider, { store }, children);
};

describe('useTheme', () => {
  it('returns light theme when setting is light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: createWrapper('light') });
    expect(result.current.isDark).toBe(false);
    expect(result.current.theme.colors.background).toBe(lightTheme.colors.background);
  });

  it('returns dark theme when setting is dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: createWrapper('dark') });
    expect(result.current.isDark).toBe(true);
    expect(result.current.theme.colors.background).toBe(darkTheme.colors.background);
  });
});
