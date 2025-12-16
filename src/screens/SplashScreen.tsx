import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '@hooks/useTheme';

export const SplashScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(300)}
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="displayMedium" style={{ color: theme.colors.primary }}>
        Portfolio
      </Text>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    marginTop: 24,
  },
});
