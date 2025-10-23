/**
 * Preferences Slice Tests
 * 
 * Unit tests for preferences Redux slice
 * 
 * @module __tests__/redux/preferencesSlice
 */

import preferencesReducer, {
  setSelectedSection,
  setLocationFilter,
  setKeywordsFilter,
  clearFilters,
  resetPreferences,
} from '../../redux/slices/preferencesSlice';

describe('preferencesSlice', () => {
  const initialState = {
    selectedSection: 'home',
    filters: {
      location: '',
      keywords: '',
    },
  };

  it('should return the initial state', () => {
    expect(preferencesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle setSelectedSection', () => {
    const actual = preferencesReducer(initialState, setSelectedSection('world'));
    expect(actual.selectedSection).toBe('world');
  });

  it('should handle setLocationFilter', () => {
    const actual = preferencesReducer(initialState, setLocationFilter('Paris'));
    expect(actual.filters.location).toBe('Paris');
  });

  it('should handle setKeywordsFilter', () => {
    const actual = preferencesReducer(
      initialState,
      setKeywordsFilter('climate change')
    );
    expect(actual.filters.keywords).toBe('climate change');
  });

  it('should handle clearFilters', () => {
    const stateWithFilters = {
      ...initialState,
      filters: {
        location: 'Paris',
        keywords: 'climate',
      },
    };

    const actual = preferencesReducer(stateWithFilters, clearFilters());
    expect(actual.filters.location).toBe('');
    expect(actual.filters.keywords).toBe('');
  });

  it('should handle resetPreferences', () => {
    const modifiedState = {
      selectedSection: 'world',
      filters: {
        location: 'Paris',
        keywords: 'climate',
      },
    };

    const actual = preferencesReducer(modifiedState, resetPreferences());
    expect(actual).toEqual(initialState);
  });
});

