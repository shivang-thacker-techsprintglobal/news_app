/**
 * useArticles Hook
 *
 * Custom hook for managing articles state and operations
 * Provides offline capability by checking cache before fetching
 *
 * @module hooks/useArticles
 */

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticles,
  selectCurrentArticles,
  selectArticlesLoading,
  selectArticlesError,
  selectArticlesBySection,
  selectLastFetchTime,
  setCurrentArticlesFromCache,
} from "../redux";
import { applyFilters } from "../utils";

/**
 * Cache duration in milliseconds (5 minutes)
 */
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Custom hook for articles management
 *
 * @param {string} section - The section to fetch articles for
 * @param {Object} filters - Filters to apply to articles
 * @returns {Object} Articles state and operations
 *
 * @example
 * const { articles, loading, error, refresh } = useArticles('world', { location: 'Paris' });
 */
export const useArticles = (section, filters = {}) => {
  const dispatch = useDispatch();

  // Memoize selectors to prevent unnecessary rerenders
  const selectCachedArticles = useMemo(
    () => selectArticlesBySection(section),
    [section]
  );
  const selectSectionLastFetchTime = useMemo(
    () => selectLastFetchTime(section),
    [section]
  );

  // Redux state
  const allArticles = useSelector(selectCurrentArticles);
  const loading = useSelector(selectArticlesLoading);
  const error = useSelector(selectArticlesError);
  const cachedArticles = useSelector(selectCachedArticles);
  const lastFetchTime = useSelector(selectSectionLastFetchTime);

  // Local state
  const [filteredArticles, setFilteredArticles] = useState([]);

  /**
   * Check if cache is still valid
   */
  const isCacheValid = () => {
    if (!lastFetchTime) return false;
    return Date.now() - lastFetchTime < CACHE_DURATION;
  };

  /**
   * Load articles (from cache or API)
   */
  const loadArticles = async (forceRefresh = false) => {
    // If cache is valid and not forcing refresh, use cached data
    if (!forceRefresh && isCacheValid() && cachedArticles.length > 0) {
      dispatch(setCurrentArticlesFromCache({ section }));
      return;
    }

    // Otherwise, fetch from API
    // If network fails, we'll fall back to cached data automatically
    try {
      await dispatch(fetchArticles(section)).unwrap();
    } catch (err) {
      // If fetch fails and we have cached data, use it
      if (cachedArticles.length > 0) {
        dispatch(setCurrentArticlesFromCache({ section }));
      }
    }
  };

  /**
   * Refresh articles (force fetch from API)
   */
  const refresh = () => {
    return loadArticles(true);
  };

  /**
   * Load articles when section changes
   */
  useEffect(() => {
    loadArticles();
  }, [section]);

  /**
   * Apply filters when articles or filters change
   */
  useEffect(() => {
    const filtered = applyFilters(allArticles, filters);
    setFilteredArticles(filtered);
  }, [allArticles, filters]);

  return {
    articles: filteredArticles,
    allArticles,
    loading,
    error,
    refresh,
    isCacheValid: isCacheValid(),
  };
};

export default useArticles;
