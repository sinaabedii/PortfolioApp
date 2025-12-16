import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch, Divider, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@hooks/useTheme';
import { useAppDispatch, useAppSelector, useBiometric } from '@hooks/index';
import { setTheme, setLanguage, toggleNotifications, toggleBiometric } from '@store/slices/settingsSlice';
import { logout } from '@store/slices/authSlice';
import { SUPPORTED_LANGUAGES } from '@constants/config';
import { spacing } from '@theme/index';

export const SettingsScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.settings);
  const { isAvailable: biometricAvailable } = useBiometric();

  const handleThemeChange = useCallback(
    (value: boolean) => {
      dispatch(setTheme(value ? 'dark' : 'light'));
    },
    [dispatch],
  );

  const handleLanguageChange = useCallback(
    (langCode: string) => {
      dispatch(setLanguage(langCode));
      i18n.changeLanguage(langCode);
    },
    [dispatch, i18n],
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
          {t('settings.title')}
        </Text>

        <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <List.Item
            title={t('settings.darkMode')}
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => <Switch value={isDark} onValueChange={handleThemeChange} />}
          />
          <Divider />
          <List.Item
            title={t('settings.notifications')}
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch value={settings.notifications} onValueChange={() => dispatch(toggleNotifications())} />
            )}
          />

          {biometricAvailable && (
            <>
              <Divider />
              <List.Item
                title={t('settings.biometric')}
                left={props => <List.Icon {...props} icon="fingerprint" />}
                right={() => (
                  <Switch value={settings.biometricEnabled} onValueChange={() => dispatch(toggleBiometric())} />
                )}
              />
            </>
          )}
        </Surface>

        <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <List.Subheader>{t('settings.language')}</List.Subheader>
          {SUPPORTED_LANGUAGES.slice(0, 3).map(lang => (
            <List.Item
              key={lang.code}
              title={lang.name}
              onPress={() => handleLanguageChange(lang.code)}
              right={props =>
                settings.language === lang.code ? <List.Icon {...props} icon="check" /> : null
              }
            />
          ))}
        </Surface>

        <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <List.Item
            title={t('settings.about')}
            description={`${t('settings.version')} 1.0.0`}
            left={props => <List.Icon {...props} icon="information" />}
          />
        </Surface>

        <View style={styles.logoutSection}>
          <Button mode="outlined" onPress={handleLogout} textColor={theme.colors.error}>
            {t('auth.logout')}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { padding: spacing.lg },
  section: { marginHorizontal: spacing.lg, marginBottom: spacing.lg, borderRadius: 12 },
  logoutSection: { padding: spacing.lg, marginTop: spacing.lg },
});
