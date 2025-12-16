import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { useTheme } from '@hooks/useTheme';
import { spacing } from '@theme/index';
import type { ChatMessage } from '@types/index';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, isOwn ? styles.ownContainer : styles.otherContainer]}>
      <Surface
        style={[
          styles.bubble,
          {
            backgroundColor: isOwn ? theme.colors.primary : theme.colors.surfaceVariant,
          },
        ]}
        elevation={1}>
        <Text
          variant="bodyMedium"
          style={{ color: isOwn ? theme.colors.onPrimary : theme.colors.onSurface }}>
          {message.content}
        </Text>
        <Text
          variant="labelSmall"
          style={[styles.time, { color: isOwn ? theme.colors.onPrimary : theme.colors.onSurfaceVariant }]}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: spacing.xs, maxWidth: '80%' },
  ownContainer: { alignSelf: 'flex-end' },
  otherContainer: { alignSelf: 'flex-start' },
  bubble: { padding: spacing.sm, borderRadius: 16 },
  time: { marginTop: spacing.xs, alignSelf: 'flex-end', opacity: 0.7 },
});
