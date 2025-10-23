/**
 * Redux Module Index
 * 
 * Exports all Redux-related functionality
 * 
 * @module redux
 */

// Store
export { store, persistor } from './store';

// Articles slice
export {
  fetchArticles,
  setCurrentArticlesFromCache,
  clearError,
  clearArticles,
  selectCurrentArticles,
  selectArticlesLoading,
  selectArticlesError,
  selectArticlesBySection,
  selectLastFetchTime,
} from './slices/articlesSlice';

// Preferences slice
export {
  setSelectedSection,
  setLocationFilter,
  setKeywordsFilter,
  clearFilters,
  resetPreferences,
  selectSelectedSection,
  selectFilters,
  selectLocationFilter,
  selectKeywordsFilter,
} from './slices/preferencesSlice';

