import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@hooks/useTheme';
import { spacing } from '@theme/index';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Icon name={icon} size={64} color={theme.colors.onSurfaceVariant} />
      <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onBackground }]}>
        {title}
      </Text>
      {description && (
        <Text variant="bodyMedium" style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
          {description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  title: { marginTop: spacing.lg, textAlign: 'center' },
  description: { marginTop: spacing.sm, textAlign: 'center' },
});
