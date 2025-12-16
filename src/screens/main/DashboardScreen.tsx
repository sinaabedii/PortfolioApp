import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Text, Card, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@hooks/useTheme';
import { useAppSelector } from '@hooks/index';
import { useGetProfileQuery } from '@store/api/apiSlice';
import { ShimmerPlaceholder } from '@components/common/ShimmerPlaceholder';
import { StatCard } from '@components/dashboard/StatCard';
import { spacing } from '@theme/index';

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.lg * 3) / 2;

export const DashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const user = useAppSelector(state => state.auth.user);
  const { isLoading, refetch } = useGetProfileQuery(undefined);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const stats = [
    { title: 'Projects', value: '12', icon: 'folder', color: theme.colors.primary },
    { title: 'Messages', value: '48', icon: 'email', color: theme.colors.secondary },
    { title: 'Tasks', value: '7', icon: 'check-circle', color: '#4CAF50' },
    { title: 'Notifications', value: '3', icon: 'bell', color: '#FF9800' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />
        }>
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <Text variant="headlineMedium" style={[styles.greeting, { color: theme.colors.onBackground }]}>
            {t('dashboard.welcome', { name: user?.firstName || 'User' })}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            {t('dashboard.stats')}
          </Text>
          <View style={styles.statsGrid}>
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <ShimmerPlaceholder key={i} width={cardWidth} height={100} style={styles.statCard} />
                  ))
              : stats.map((stat, index) => (
                  <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    delay={index * 100}
                    width={cardWidth}
                  />
                ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            {t('dashboard.recentActivity')}
          </Text>
          <Surface style={[styles.activityCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Card.Content>
              {isLoading ? (
                <>
                  <ShimmerPlaceholder width="100%" height={20} style={{ marginBottom: 12 }} />
                  <ShimmerPlaceholder width="80%" height={20} style={{ marginBottom: 12 }} />
                  <ShimmerPlaceholder width="60%" height={20} />
                </>
              ) : (
                <>
                  <Text variant="bodyMedium">• Completed project setup</Text>
                  <Text variant="bodyMedium" style={styles.activityItem}>• Updated profile information</Text>
                  <Text variant="bodyMedium" style={styles.activityItem}>• Joined new chat room</Text>
                </>
              )}
            </Card.Content>
          </Surface>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: spacing.lg },
  greeting: { marginBottom: spacing.lg },
  sectionTitle: { marginBottom: spacing.md, marginTop: spacing.lg },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  statCard: { marginBottom: spacing.md },
  activityCard: { borderRadius: 12, padding: spacing.sm },
  activityItem: { marginTop: spacing.sm },
});
