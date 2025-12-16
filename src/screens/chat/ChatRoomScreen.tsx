import React, { useEffect, useCallback, useState, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton, Text, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@hooks/useTheme';
import { useAppSelector } from '@hooks/index';
import { useGetMessagesQuery } from '@store/api/apiSlice';
import { socketService } from '@services/socket/socketService';
import { MessageBubble } from '@components/chat/MessageBubble';
import { spacing } from '@theme/index';
import type { ChatStackParamList, ChatMessage } from '@types/index';

type ChatRoomRouteProp = RouteProp<ChatStackParamList, 'ChatRoom'>;

export const ChatRoomScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const route = useRoute<ChatRoomRouteProp>();
  const { roomId } = route.params;
  const currentUserId = useAppSelector(state => state.auth.user?.id);
  const typingUsers = useAppSelector(state => state.chat.typingUsers[roomId] || []);
  const { data, isLoading } = useGetMessagesQuery({ roomId });
  const [message, setMessage] = useState('');
  const listRef = useRef<FlashList<ChatMessage>>(null);

  useEffect(() => {
    socketService.joinRoom(roomId);
    return () => socketService.leaveRoom(roomId);
  }, [roomId]);

  const handleSend = useCallback(() => {
    if (message.trim()) {
      socketService.sendMessage(roomId, message.trim());
      setMessage('');
    }
  }, [message, roomId]);

  const handleTyping = useCallback(() => {
    socketService.sendTyping(roomId);
  }, [roomId]);

  const renderItem = useCallback(
    ({ item }: { item: ChatMessage }) => (
      <MessageBubble message={item} isOwn={item.senderId === currentUserId} />
    ),
    [currentUserId],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={90}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <FlashList
            ref={listRef}
            data={data?.data || []}
            renderItem={renderItem}
            estimatedItemSize={60}
            inverted
            contentContainerStyle={styles.listContent}
          />
        )}

        {typingUsers.length > 0 && (
          <Text variant="bodySmall" style={[styles.typingIndicator, { color: theme.colors.onSurfaceVariant }]}>
            {t('chat.typing')}
          </Text>
        )}

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
          <TextInput
            mode="outlined"
            placeholder={t('chat.typeMessage')}
            value={message}
            onChangeText={text => {
              setMessage(text);
              handleTyping();
            }}
            style={styles.input}
            dense
          />
          <IconButton
            icon="send"
            mode="contained"
            onPress={handleSend}
            disabled={!message.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { padding: spacing.md },
  typingIndicator: { paddingHorizontal: spacing.lg, paddingVertical: spacing.xs },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: spacing.sm },
  input: { flex: 1, marginRight: spacing.sm },
});
