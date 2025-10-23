/**
 * HomeScreen Component
 *
 * Main screen of the app displaying:
 * - Section filters
 * - Location and keyword filters
 * - List of articles
 * - Pull to refresh functionality
 *
 * @module screens/HomeScreen
 */

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ArticleCard,
  SectionFilter,
  FilterDropdown,
  EmptyState,
  ErrorView,
  ArticleCardSkeleton,
} from "../components";
import { useArticles } from "../hooks";
import {
  setSelectedSection,
  setLocationFilter,
  setKeywordsFilter,
  selectSelectedSection,
  selectFilters,
} from "../redux";
import { colors, spacing, moderateScale } from "../theme";
import { getUniqueLocations, getUniqueKeywords } from "../utils";

/**
 * HomeScreen Component
 *
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object from React Navigation
 * @returns {JSX.Element} HomeScreen component
 */
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Redux state
  const selectedSection = useSelector(selectSelectedSection);
  const filters = useSelector(selectFilters);

  // Local state for dropdown options
  const [locationOptions, setLocationOptions] = useState([]);
  const [keywordOptions, setKeywordOptions] = useState([]);

  // Use articles hook with section and filters
  const { articles, allArticles, loading, error, refresh, isCacheValid } =
    useArticles(selectedSection, filters);

  /**
   * Handle section change
   */
  const handleSectionChange = (section) => {
    dispatch(setSelectedSection(section));
  };

  /**
   * Handle location filter change
   */
  const handleLocationChange = (location) => {
    dispatch(setLocationFilter(location));
  };

  /**
   * Handle keywords filter change
   */
  const handleKeywordsChange = (keywords) => {
    dispatch(setKeywordsFilter(keywords));
  };

  /**
   * Handle article press
   */
  const handleArticlePress = (article) => {
    navigation.navigate("ArticleDetail", { article });
  };

  /**
   * Update location and keyword options when articles change
   */
  useEffect(() => {
    const locations = getUniqueLocations(allArticles);
    const keywords = getUniqueKeywords(allArticles);
    setLocationOptions(locations);
    setKeywordOptions(keywords);
  }, [allArticles]);

  /**
   * Render article item
   */
  const renderArticle = ({ item }) => (
    <ArticleCard article={item} onPress={() => handleArticlePress(item)} />
  );

  /**
   * Render list header
   */
  const renderHeader = () => (
    <View>
      {/* Section Filter */}

      {/* Location and Keywords Filters */}
      <View style={styles.filtersContainer}>
        <FilterDropdown
          label="LOCATION"
          value={filters.location}
          onChange={handleLocationChange}
          placeholder="Filter by location"
          options={locationOptions}
        />
        <FilterDropdown
          label="KEYWORDS"
          value={filters.keywords}
          onChange={handleKeywordsChange}
          placeholder="Filter by keywords"
          options={keywordOptions}
        />
      </View>

      {/* Cache indicator */}
      {!isCacheValid && !loading && (
        <View style={styles.cacheInfo}>
          <Text style={styles.cacheText}>
            Showing cached results. Pull to refresh.
          </Text>
        </View>
      )}
    </View>
  );

  /**
   * Render loading skeleton
   */
  const renderLoadingSkeleton = () => {
    return (
      <>
        {renderHeader()}
        {[...Array(5)].map((_, index) => (
          <ArticleCardSkeleton key={`skeleton-${index}`} />
        ))}
      </>
    );
  };

  /**
   * Render empty state
   */
  const renderEmptyState = () => {
    if (loading && articles.length === 0) {
      return null;
    }

    if (filters.location || filters.keywords) {
      return (
        <EmptyState
          message="No articles match your filters"
          icon="filter-outline"
        />
      );
    }

    return (
      <EmptyState message="No articles available" icon="newspaper-outline" />
    );
  };

  /**
   * Render main content based on state
   */
  const renderContent = () => {
    // Error state
    if (error && articles.length === 0) {
      return <ErrorView message={error.message} onRetry={refresh} />;
    }

    // Loading state (initial load or section change)
    if (loading) {
      return (
        <View style={styles.skeletonContainer}>{renderLoadingSkeleton()}</View>
      );
    }

    // Normal state - show articles list
    return (
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          articles.length === 0 ? styles.emptyContent : styles.content
        }
        refreshControl={
          <RefreshControl
            refreshing={loading && articles.length > 0}
            onRefresh={refresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Static Header - Always visible */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NYT News Feed</Text>
      </View>

      {/* Static Section Filter - Always visible */}
      <SectionFilter
        selectedSection={selectedSection}
        onSelectSection={handleSectionChange}
      />

      {/* Dynamic Content - Changes based on state */}
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: colors.white,
  },
  skeletonContainer: {
    flex: 1,
    // paddingTop: spacing.md,
  },
  filtersContainer: {
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
  },
  cacheInfo: {
    backgroundColor: colors.warning,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: moderateScale(8),
  },
  cacheText: {
    fontSize: moderateScale(12),
    color: colors.white,
    textAlign: "center",
  },
  content: {
    paddingBottom: spacing.md,
  },
  emptyContent: {
    flexGrow: 1,
  },
});

export default HomeScreen;
