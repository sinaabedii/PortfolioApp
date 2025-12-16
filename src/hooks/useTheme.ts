import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useAppSelector } from './useAppSelector';
import { lightTheme, darkTheme } from '@theme/index';
import type { MD3Theme } from 'react-native-paper';

interface UseThemeReturn {
  theme: MD3Theme;
  isDark: boolean;
}

export const useTheme = (): UseThemeReturn => {
  const systemColorScheme = useColorScheme();
  const themeSetting = useAppSelector(state => state.settings.theme);

  const { theme, isDark } = useMemo(() => {
    let isDarkMode: boolean;

    if (themeSetting === 'system') {
      isDarkMode = systemColorScheme === 'dark';
    } else {
      isDarkMode = themeSetting === 'dark';
    }

    return {
      theme: isDarkMode ? darkTheme : lightTheme,
      isDark: isDarkMode,
    };
  }, [themeSetting, systemColorScheme]);

  return { theme, isDark };
};
