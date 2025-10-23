/**
 * Articles Redux Slice
 *
 * Manages the state for articles, including:
 * - Fetching articles from API
 * - Caching articles for offline use
 * - Managing loading and error states
 *
 * @module redux/slices/articlesSlice
 */

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { getTopStories } from "../../api";

/**
 * Initial state for articles
 */
const initialState = {
  // Articles by section (for caching)
  articlesBySection: {},

  // Current section's articles
  currentArticles: [],

  // Loading state
  loading: false,

  // Error state
  error: null,

  // Last fetch timestamp by section
  lastFetchTime: {},
};

/**
 * Async thunk to fetch articles by section
 *
 * @param {string} section - The section to fetch
 * @returns {Promise<Object>} Articles data with section
 */
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (section, { rejectWithValue }) => {
    try {
      const articles = await getTopStories(section);
      return {
        section,
        articles,
        timestamp: Date.now(),
      };
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status,
      });
    }
  }
);

/**
 * Articles slice
 */
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    /**
     * Set current articles from cache
     */
    setCurrentArticlesFromCache: (state, action) => {
      const { section } = action.payload;
      // Set to cached articles if they exist, otherwise set to empty array
      state.currentArticles = state.articlesBySection[section] || [];
    },

    /**
     * Clear error
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Clear all articles (useful for logout or refresh)
     */
    clearArticles: (state) => {
      state.articlesBySection = {};
      state.currentArticles = [];
      state.lastFetchTime = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch articles - pending
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fetch articles - fulfilled
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { section, articles, timestamp } = action.payload;
        state.loading = false;
        state.currentArticles = articles;
        state.articlesBySection[section] = articles;
        state.lastFetchTime[section] = timestamp;
      })
      // Fetch articles - rejected
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Failed to fetch articles" };
      });
  },
});

export const { setCurrentArticlesFromCache, clearError, clearArticles } =
  articlesSlice.actions;

export default articlesSlice.reducer;

// Stable empty array to avoid creating new references
const EMPTY_ARRAY = [];

// Selectors
export const selectCurrentArticles = (state) => state.articles.currentArticles;
export const selectArticlesLoading = (state) => state.articles.loading;
export const selectArticlesError = (state) => state.articles.error;

// Base selectors
const selectArticlesBySectionBase = (state) => state.articles.articlesBySection;
const selectLastFetchTimeBase = (state) => state.articles.lastFetchTime;

// Memoized selector factories
export const selectArticlesBySection = (section) =>
  createSelector(
    [selectArticlesBySectionBase],
    (articlesBySection) => articlesBySection[section] || EMPTY_ARRAY
  );

export const selectLastFetchTime = (section) =>
  createSelector(
    [selectLastFetchTimeBase],
    (lastFetchTime) => lastFetchTime[section] || null
  );
