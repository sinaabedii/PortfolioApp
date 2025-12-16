import React, { useCallback } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@hooks/useTheme';
import { useGetChatRoomsQuery } from '@store/api/apiSlice';
import { ChatRoomItem } from '@components/chat/ChatRoomItem';
import { ShimmerPlaceholder } from '@components/common/ShimmerPlaceholder';
import type { ChatStackParamList, ChatRoom } from '@types/index';

type NavigationProp = NativeStackNavigationProp<ChatStackParamList, 'ChatList'>;

export const ChatListScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { data, isLoading, refetch } = useGetChatRoomsQuery(undefined);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleRoomPress = useCallback(
    (room: ChatRoom) => {
      const otherUser = room.participants[0];
      navigation.navigate('ChatRoom', { roomId: room.id, userId: otherUser.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ChatRoom }) => <ChatRoomItem room={item} onPress={() => handleRoomPress(item)} />,
    [handleRoomPress],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
        {t('chat.title')}
      </Text>

      {isLoading ? (
        Array(5)
          .fill(0)
          .map((_, i) => <ShimmerPlaceholder key={i} width="100%" height={72} style={styles.shimmer} />)
      ) : (
        <FlashList
          data={data?.data || []}
          renderItem={renderItem}
          estimatedItemSize={72}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />
          }
        />
      )}
      <FAB icon="plus" style={[styles.fab, { backgroundColor: theme.colors.primary }]} onPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { padding: 16 },
  shimmer: { marginHorizontal: 16, marginBottom: 8 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
});
