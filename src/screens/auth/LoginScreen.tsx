import React, { useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@hooks/useTheme';
import { useAppDispatch, useAppSelector, useBiometric } from '@hooks/index';
import { login } from '@store/slices/authSlice';
import { spacing } from '@theme/index';
import type { AuthStackParamList } from '@types/index';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const loginSchema = Yup.object().shape({
  email: Yup.string().email('validation.invalidEmail').required('validation.required'),
  password: Yup.string().min(8, 'validation.passwordMin').required('validation.required'),
});

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const { biometricEnabled } = useAppSelector(state => state.settings);
  const { isAvailable, biometryType, authenticate } = useBiometric();

  const handleLogin = useCallback(
    async (values: { email: string; password: string }) => {
      await dispatch(login(values));
    },
    [dispatch],
  );

  const handleBiometricLogin = useCallback(async () => {
    const success = await authenticate();
    if (success) {
      // Retrieve stored credentials and login
      // This would typically use secure storage
    }
  }, [authenticate]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
              {t('auth.login')}
            </Text>
          </View>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <TextInput
                  mode="outlined"
                  label={t('auth.email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.email && !!errors.email}
                />
                {touched.email && errors.email && (
                  <HelperText type="error">{t(errors.email)}</HelperText>
                )}

                <TextInput
                  mode="outlined"
                  label={t('auth.password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  error={touched.password && !!errors.password}
                  style={styles.input}
                />
                {touched.password && errors.password && (
                  <HelperText type="error">{t(errors.password)}</HelperText>
                )}

                {error && <HelperText type="error">{error}</HelperText>}

                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.button}>
                  {t('auth.signIn')}
                </Button>

                {isAvailable && biometricEnabled && (
                  <Button
                    mode="outlined"
                    onPress={handleBiometricLogin}
                    icon="fingerprint"
                    style={styles.button}>
                    {biometryType || t('auth.biometricPrompt')}
                  </Button>
                )}

                <Button
                  mode="text"
                  onPress={() => navigation.navigate('ForgotPassword')}
                  style={styles.linkButton}>
                  {t('auth.forgotPassword')}
                </Button>

                <View style={styles.footer}>
                  <Text variant="bodyMedium">{t('auth.noAccount')}</Text>
                  <Button mode="text" onPress={() => navigation.navigate('Register')}>
                    {t('auth.signUp')}
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  form: {
    flex: 1,
  },
  input: {
    marginTop: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
  },
  linkButton: {
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
});
