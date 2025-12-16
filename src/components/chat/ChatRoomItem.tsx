import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text, Badge, Surface } from 'react-native-paper';
import { useTheme } from '@hooks/useTheme';
import { spacing } from '@theme/index';
import type { ChatRoom } from '@types/index';

interface ChatRoomItemProps {
  room: ChatRoom;
  onPress: () => void;
}

export const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ room, onPress }) => {
  const { theme } = useTheme();
  const otherUser = room.participants[0];

  return (
    <TouchableOpacity onPress={onPress}>
      <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]} elevation={0}>
        <Avatar.Image size={50} source={{ uri: otherUser?.avatar || 'https://via.placeholder.com/50' }} />
        <Surface style={styles.content} elevation={0}>
          <Text variant="titleMedium" numberOfLines={1}>
            {otherUser?.firstName} {otherUser?.lastName}
          </Text>
          <Text variant="bodySmall" numberOfLines={1} style={{ color: theme.colors.onSurfaceVariant }}>
            {room.lastMessage?.content || 'No messages yet'}
          </Text>
        </Surface>
        {room.unreadCount > 0 && (
          <Badge style={{ backgroundColor: theme.colors.primary }}>{room.unreadCount}</Badge>
        )}
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  content: { flex: 1, marginLeft: spacing.md, backgroundColor: 'transparent' },
});
