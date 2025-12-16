import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Avatar, Text, Drawer, Divider } from 'react-native-paper';
import { useTheme } from '@hooks/useTheme';
import { useAppSelector, useAppDispatch } from '@hooks/index';
import { logout } from '@store/slices/authSlice';
import { spacing } from '@theme/index';

export const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.colors.surface }}>
      <View style={styles.header}>
        <Avatar.Image size={64} source={{ uri: user?.avatar || 'https://via.placeholder.com/64' }} />
        <Text variant="titleMedium" style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {user?.email}
        </Text>
      </View>
      <Divider />
      <Drawer.Section>
        <Drawer.Item icon="view-dashboard" label="Dashboard" onPress={() => {}} />
        <Drawer.Item icon="chat" label="Messages" onPress={() => {}} />
        <Drawer.Item icon="account" label="Profile" onPress={() => {}} />
        <Drawer.Item icon="cog" label="Settings" onPress={() => {}} />
      </Drawer.Section>
      <Divider />
      <Drawer.Section>
        <Drawer.Item icon="logout" label="Logout" onPress={() => dispatch(logout())} />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: { padding: spacing.lg, alignItems: 'center' },
  name: { marginTop: spacing.md },
});
