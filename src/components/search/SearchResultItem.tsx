import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text, Surface } from 'react-native-paper';
import { useTheme } from '@hooks/useTheme';
import { spacing } from '@theme/index';

interface SearchResultItemProps {
  item: unknown;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  const { theme } = useTheme();
  const data = item as { id: string; name?: string; title?: string; avatar?: string; type: string };

  return (
    <TouchableOpacity>
      <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]} elevation={0}>
        <Avatar.Image size={48} source={{ uri: data.avatar || 'https://via.placeholder.com/48' }} />
        <Surface style={styles.content} elevation={0}>
          <Text variant="titleMedium" numberOfLines={1}>
            {data.name || data.title || 'Unknown'}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {data.type}
          </Text>
        </Surface>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  content: { flex: 1, marginLeft: spacing.md, backgroundColor: 'transparent' },
});
