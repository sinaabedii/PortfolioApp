import React from 'react';
import { StyleSheet } from 'react-native';
import { Banner, Text } from 'react-native-paper';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@hooks/index';
import { useTheme } from '@hooks/useTheme';

export const OfflineBanner: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isOnline = useAppSelector(state => state.sync.isOnline);

  if (isOnline) return null;

  return (
    <Animated.View entering={FadeInUp.duration(300)} exiting={FadeOutUp.duration(300)}>
      <Banner
        visible
        icon={({ size }) => <Icon name="wifi-off" size={size} color={theme.colors.onError} />}
        style={[styles.banner, { backgroundColor: theme.colors.error }]}>
        <Text style={{ color: theme.colors.onError }}>{t('common.offline')}</Text>
      </Banner>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: { paddingVertical: 8 },
});
