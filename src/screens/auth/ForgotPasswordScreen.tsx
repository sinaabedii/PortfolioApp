import React, { useState, useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@hooks/useTheme';
import { authService } from '@services/api/authService';
import { spacing } from '@theme/index';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('validation.invalidEmail').required('validation.required'),
});

export const ForgotPasswordScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (values: { email: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(values.email);
      setIsSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isSuccess) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Check your email
          </Text>
          <Text variant="bodyLarge" style={styles.description}>
            We've sent password reset instructions to your email address.
          </Text>
          <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
            Back to Login
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <View style={styles.content}>
          <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
            {t('auth.resetPassword')}
          </Text>
          <Text variant="bodyLarge" style={styles.description}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, handleSubmit: formSubmit, values, errors, touched }) => (
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

                {error && <HelperText type="error">{error}</HelperText>}

                <Button
                  mode="contained"
                  onPress={() => formSubmit()}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.button}>
                  Send Reset Link
                </Button>

                <Button mode="text" onPress={() => navigation.goBack()} style={styles.linkButton}>
                  Back to Login
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  content: { flex: 1, padding: spacing.lg, justifyContent: 'center' },
  title: { marginBottom: spacing.md },
  description: { marginTop: spacing.md, marginBottom: spacing.xl, opacity: 0.7 },
  form: { marginTop: spacing.lg },
  button: { marginTop: spacing.lg },
  linkButton: { marginTop: spacing.sm },
});
