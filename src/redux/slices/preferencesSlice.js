/**
 * Preferences Redux Slice
 *
 * Manages user preferences including:
 * - Selected section (persisted across app restarts)
 * - Filter settings
 *
 * @module redux/slices/preferencesSlice
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for preferences
 */
const initialState = {
  // Currently selected section
  selectedSection: "home",

  // Filter settings
  filters: {
    location: "",
    keywords: "",
  },
};

/**
 * Preferences slice
 */
const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    /**
     * Set the selected section
     * This will be persisted so users can continue where they left off
     */
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
    },

    /**
     * Set location filter
     */
    setLocationFilter: (state, action) => {
      state.filters.location = action.payload;
    },

    /**
     * Set keywords filter
     */
    setKeywordsFilter: (state, action) => {
      state.filters.keywords = action.payload;
    },

    /**
     * Clear all filters
     */
    clearFilters: (state) => {
      state.filters.location = "";
      state.filters.keywords = "";
    },

    /**
     * Reset preferences to default
     */
    resetPreferences: (state) => {
      state.selectedSection = "home";
      state.filters = {
        location: "",
        keywords: "",
      };
    },
  },
});

export const {
  setSelectedSection,
  setLocationFilter,
  setKeywordsFilter,
  clearFilters,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;

// Selectors
export const selectSelectedSection = (state) =>
  state.preferences.selectedSection;
export const selectFilters = (state) => state.preferences.filters;
export const selectLocationFilter = (state) =>
  state.preferences.filters.location;
export const selectKeywordsFilter = (state) =>
  state.preferences.filters.keywords;
