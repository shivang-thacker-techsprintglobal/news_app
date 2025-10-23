/**
 * Filter Utility Functions
 *
 * Helper functions for filtering articles
 *
 * @module utils/filterUtils
 */

/**
 * Filter articles by location
 * Performs exact match on geo_facet array
 *
 * @param {Array} articles - Array of articles to filter
 * @param {string} location - Location to filter by (exact match from geo_facet)
 * @returns {Array} Filtered articles
 *
 * @example
 * filterByLocation(articles, 'New York City')
 */
export const filterByLocation = (articles, location) => {
  if (!location || !location.trim()) {
    return articles;
  }

  const searchTerm = location.trim();

  return articles.filter((article) => {
    if (!article.geoFacet || article.geoFacet.length === 0) {
      return false;
    }

    // Exact match on geo_facet items
    return article.geoFacet.some((geo) => geo === searchTerm);
  });
};

/**
 * Filter articles by keywords
 * Performs exact match on des_facet array
 *
 * @param {Array} articles - Array of articles to filter
 * @param {string} keywords - Keyword to filter by (exact match from des_facet)
 * @returns {Array} Filtered articles
 *
 * @example
 * filterByKeywords(articles, 'Antitrust Laws and Competition Issues')
 */
export const filterByKeywords = (articles, keywords) => {
  if (!keywords || !keywords.trim()) {
    return articles;
  }

  const searchTerm = keywords.trim();

  return articles.filter((article) => {
    if (!article.desFacet || article.desFacet.length === 0) {
      return false;
    }

    // Exact match on des_facet items
    return article.desFacet.some((keyword) => keyword === searchTerm);
  });
};

/**
 * Apply all filters to articles
 *
 * @param {Array} articles - Array of articles to filter
 * @param {Object} filters - Filter object with location and keywords
 * @returns {Array} Filtered articles
 *
 * @example
 * applyFilters(articles, { location: 'Paris', keywords: 'technology' })
 */
export const applyFilters = (articles, filters) => {
  let filtered = articles;

  if (filters.location) {
    filtered = filterByLocation(filtered, filters.location);
  }

  if (filters.keywords) {
    filtered = filterByKeywords(filtered, filters.keywords);
  }

  return filtered;
};

/**
 * Get unique locations from articles
 *
 * @param {Array} articles - Array of articles
 * @returns {Array} Array of unique locations
 */
export const getUniqueLocations = (articles) => {
  const locations = new Set();

  articles.forEach((article) => {
    if (article.geoFacet && article.geoFacet.length > 0) {
      article.geoFacet.forEach((geo) => locations.add(geo));
    }
  });

  return Array.from(locations).sort();
};

/**
 * Get unique keywords from articles
 *
 * @param {Array} articles - Array of articles
 * @returns {Array} Array of unique keywords
 */
export const getUniqueKeywords = (articles) => {
  const keywords = new Set();

  articles.forEach((article) => {
    if (article.desFacet && article.desFacet.length > 0) {
      article.desFacet.forEach((keyword) => keywords.add(keyword));
    }
  });

  return Array.from(keywords).sort();
};
