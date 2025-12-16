import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Chip, Text, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';
import { useTheme } from '@hooks/useTheme';
import { useLazySearchQuery } from '@store/api/apiSlice';
import { SearchResultItem } from '@components/search/SearchResultItem';
import { EmptyState } from '@components/common/EmptyState';
import { spacing } from '@theme/index';

const FILTERS = ['All', 'Users', 'Projects', 'Messages'];

export const SearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, { data, isLoading, isFetching }] = useLazySearchQuery();

  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery: string, filter: string) => {
        if (searchQuery.length >= 2) {
          search({ query: searchQuery, filters: { type: filter.toLowerCase() } });
        }
      }, 300),
    [search],
  );

  const handleSearch = useCallback(
    (text: string) => {
      setQuery(text);
      debouncedSearch(text, activeFilter);
    },
    [debouncedSearch, activeFilter],
  );

  const handleFilterChange = useCallback(
    (filter: string) => {
      setActiveFilter(filter);
      if (query.length >= 2) {
        search({ query, filters: { type: filter.toLowerCase() } });
      }
    },
    [query, search],
  );

  const renderItem = useCallback(
    ({ item }: { item: unknown }) => <SearchResultItem item={item} />,
    [],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Searchbar
          placeholder={t('common.search')}
          value={query}
          onChangeText={handleSearch}
          style={[styles.searchbar, { backgroundColor: theme.colors.surfaceVariant }]}
        />
        <View style={styles.filters}>
          {FILTERS.map(filter => (
            <Chip
              key={filter}
              selected={activeFilter === filter}
              onPress={() => handleFilterChange(filter)}
              style={styles.chip}>
              {filter}
            </Chip>
          ))}
        </View>
      </View>

      {isLoading || isFetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : data?.data?.length ? (
        <FlashList
          data={data.data}
          renderItem={renderItem}
          estimatedItemSize={72}
          contentContainerStyle={styles.listContent}
        />
      ) : query.length >= 2 ? (
        <EmptyState
          icon="magnify"
          title={t('common.noResults')}
          description="Try adjusting your search or filters"
        />
      ) : (
        <View style={styles.hintContainer}>
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
            Start typing to search...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: spacing.lg },
  searchbar: { marginBottom: spacing.md },
  filters: { flexDirection: 'row', gap: spacing.sm },
  chip: { marginRight: spacing.xs },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: spacing.lg },
  hintContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
