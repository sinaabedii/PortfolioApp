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
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { register } from '@store/slices/authSlice';
import { spacing } from '@theme/index';
import type { AuthStackParamList } from '@types/index';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('validation.required'),
  lastName: Yup.string().required('validation.required'),
  email: Yup.string().email('validation.invalidEmail').required('validation.required'),
  password: Yup.string().min(8, 'validation.passwordMin').required('validation.required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'validation.passwordMatch')
    .required('validation.required'),
});

export const RegisterScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const handleRegister = useCallback(
    async (values: { firstName: string; lastName: string; email: string; password: string }) => {
      await dispatch(register(values));
    },
    [dispatch],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
              {t('auth.register')}
            </Text>
          </View>

          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <TextInput
                      mode="outlined"
                      label={t('auth.firstName')}
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      error={touched.firstName && !!errors.firstName}
                    />
                    {touched.firstName && errors.firstName && (
                      <HelperText type="error">{t(errors.firstName)}</HelperText>
                    )}
                  </View>
                  <View style={styles.halfInput}>
                    <TextInput
                      mode="outlined"
                      label={t('auth.lastName')}
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      error={touched.lastName && !!errors.lastName}
                    />
                    {touched.lastName && errors.lastName && (
                      <HelperText type="error">{t(errors.lastName)}</HelperText>
                    )}
                  </View>
                </View>

                <TextInput
                  mode="outlined"
                  label={t('auth.email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.email && !!errors.email}
                  style={styles.input}
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

                <TextInput
                  mode="outlined"
                  label={t('auth.confirmPassword')}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  style={styles.input}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <HelperText type="error">{t(errors.confirmPassword)}</HelperText>
                )}

                {error && <HelperText type="error">{error}</HelperText>}

                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.button}>
                  {t('auth.signUp')}
                </Button>

                <View style={styles.footer}>
                  <Text variant="bodyMedium">{t('auth.hasAccount')}</Text>
                  <Button mode="text" onPress={() => navigation.goBack()}>
                    {t('auth.signIn')}
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
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: spacing.lg },
  header: { marginTop: spacing.xl, marginBottom: spacing.lg },
  form: { flex: 1 },
  row: { flexDirection: 'row', gap: spacing.md },
  halfInput: { flex: 1 },
  input: { marginTop: spacing.md },
  button: { marginTop: spacing.lg },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl },
});
