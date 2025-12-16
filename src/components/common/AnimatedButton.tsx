import React from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '@hooks/useTheme';
import { spacing, borderRadius } from '@theme/index';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: interpolate(scale.value, [0.95, 1], [0.8, 1]),
  }));

  const handlePressIn = (): void => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 400 });
  };

  const handlePressOut = (): void => {
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  const getBackgroundColor = (): string => {
    if (disabled) return theme.colors.surfaceDisabled;
    switch (variant) {
      case 'secondary': return theme.colors.secondary;
      case 'outline': return 'transparent';
      default: return theme.colors.primary;
    }
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor(), borderColor: theme.colors.primary },
        variant === 'outline' && styles.outline,
        animatedStyle,
        style,
      ]}>
      <Text
        variant="labelLarge"
        style={{ color: variant === 'outline' ? theme.colors.primary : theme.colors.onPrimary }}>
        {title}
      </Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: borderRadius.md, alignItems: 'center' },
  outline: { borderWidth: 2 },
});
