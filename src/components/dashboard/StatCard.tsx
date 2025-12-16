import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '@hooks/useTheme';
import { spacing } from '@theme/index';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  delay?: number;
  width: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, delay = 0, width }) => {
  const { theme } = useTheme();

  return (
    <Animated.View entering={FadeInUp.delay(delay).duration(400)}>
      <Surface style={[styles.card, { width, backgroundColor: theme.colors.surface }]} elevation={1}>
        <Icon name={icon} size={28} color={color} />
        <Text variant="headlineSmall" style={[styles.value, { color: theme.colors.onSurface }]}>
          {value}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {title}
        </Text>
      </Surface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: { padding: spacing.md, borderRadius: 12, alignItems: 'center' },
  value: { marginTop: spacing.sm, fontWeight: 'bold' },
});
