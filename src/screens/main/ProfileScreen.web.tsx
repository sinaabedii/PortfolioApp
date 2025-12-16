import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Button, TextInput, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@hooks/useTheme';
import { useAppSelector } from '@hooks/index';
import { useUpdateProfileMutation } from '@store/api/apiSlice';
import { spacing } from '@theme/index';

const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('validation.required'),
  lastName: Yup.string().required('validation.required'),
  bio: Yup.string().max(200),
  phone: Yup.string(),
});

export const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const user = useAppSelector(state => state.auth.user);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleImagePick = useCallback(async () => {
    // Web file picker
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
  }, []);

  const handleSave = useCallback(
    async (values: { firstName: string; lastName: string; bio: string; phone: string }) => {
      await updateProfile(values);
      setIsEditing(false);
    },
    [updateProfile],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <Avatar.Image size={100} source={{ uri: user?.avatar || 'https://via.placeholder.com/100' }} />
          <Button mode="text" onPress={handleImagePick}>{t('profile.changePhoto')}</Button>
        </View>

        <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Formik
            initialValues={{
              firstName: user?.firstName || '',
              lastName: user?.lastName || '',
              bio: user?.bio || '',
              phone: user?.phone || '',
            }}
            validationSchema={profileSchema}
            onSubmit={handleSave}
            enableReinitialize>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <TextInput
                  mode="outlined"
                  label={t('auth.firstName')}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  disabled={!isEditing}
                  style={styles.input}
                />
                <TextInput
                  mode="outlined"
                  label={t('auth.lastName')}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  disabled={!isEditing}
                  style={styles.input}
                />
                <TextInput
                  mode="outlined"
                  label={t('profile.bio')}
                  value={values.bio}
                  onChangeText={handleChange('bio')}
                  onBlur={handleBlur('bio')}
                  multiline
                  numberOfLines={3}
                  disabled={!isEditing}
                  style={styles.input}
                />
                <TextInput
                  mode="outlined"
                  label={t('profile.phone')}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  keyboardType="phone-pad"
                  disabled={!isEditing}
                  style={styles.input}
                />
                {isEditing ? (
                  <View style={styles.buttonRow}>
                    <Button mode="outlined" onPress={() => setIsEditing(false)}>{t('common.cancel')}</Button>
                    <Button mode="contained" onPress={() => handleSubmit()} loading={isLoading}>{t('common.save')}</Button>
                  </View>
                ) : (
                  <Button mode="contained" onPress={() => setIsEditing(true)}>{t('profile.editProfile')}</Button>
                )}
              </>
            )}
          </Formik>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg },
  avatarSection: { alignItems: 'center', marginBottom: spacing.xl },
  card: { borderRadius: 12, padding: spacing.lg },
  input: { marginBottom: spacing.md },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md },
});
