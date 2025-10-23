/**
 * Articles Slice Tests
 * 
 * Unit tests for articles Redux slice
 * 
 * @module __tests__/redux/articlesSlice
 */

import articlesReducer, {
  setCurrentArticlesFromCache,
  clearError,
  clearArticles,
} from '../../redux/slices/articlesSlice';

describe('articlesSlice', () => {
  const initialState = {
    articlesBySection: {},
    currentArticles: [],
    loading: false,
    error: null,
    lastFetchTime: {},
  };

  it('should return the initial state', () => {
    expect(articlesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCurrentArticlesFromCache', () => {
    const previousState = {
      ...initialState,
      articlesBySection: {
        world: [{ id: '1', title: 'Test Article' }],
      },
    };

    const actual = articlesReducer(
      previousState,
      setCurrentArticlesFromCache({ section: 'world' })
    );

    expect(actual.currentArticles).toEqual([{ id: '1', title: 'Test Article' }]);
  });

  it('should handle clearError', () => {
    const previousState = {
      ...initialState,
      error: { message: 'Test error' },
    };

    const actual = articlesReducer(previousState, clearError());
    expect(actual.error).toBeNull();
  });

  it('should handle clearArticles', () => {
    const previousState = {
      ...initialState,
      articlesBySection: { world: [{ id: '1' }] },
      currentArticles: [{ id: '1' }],
      lastFetchTime: { world: 123456 },
    };

    const actual = articlesReducer(previousState, clearArticles());
    expect(actual.articlesBySection).toEqual({});
    expect(actual.currentArticles).toEqual([]);
    expect(actual.lastFetchTime).toEqual({});
  });
});

