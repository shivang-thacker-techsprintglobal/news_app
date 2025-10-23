/**
 * NYT API Client
 *
 * Handles all API requests to the New York Times Top Stories API
 * Includes error handling and retry logic for resilient network connections
 *
 * @module api/nytApi
 */

import { API_CONFIG } from "./config";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Make a fetch request with timeout
 *
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Response>} Fetch response
 */
const fetchWithTimeout = async (
  url,
  options = {},
  timeout = API_CONFIG.TIMEOUT
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new ApiError(
        "Unable to connect. Please check your internet connection.",
        408,
        null
      );
    }
    throw error;
  }
};

/**
 * Retry a function with exponential backoff
 *
 * @param {Function} fn - The function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} Result of the function
 */
const retryWithBackoff = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // Only retry on network errors or 5xx server errors
      if (error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, delay * Math.pow(2, i))
      );
    }
  }
};

/**
 * Fetch top stories by section
 *
 * @param {string} section - The section to fetch (e.g., 'world', 'science')
 * @returns {Promise<Object>} API response with articles
 * @throws {ApiError} If the request fails
 *
 * @example
 * const articles = await fetchTopStories('world');
 */
export const fetchTopStories = async (section = "home") => {
  const url = `${API_CONFIG.BASE_URL}/${section}.json?api-key=${API_CONFIG.API_KEY}`;

  return retryWithBackoff(async () => {
    try {
      const response = await fetchWithTimeout(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        // User-friendly error messages based on status code
        let friendlyMessage = "Unable to load articles. Please try again.";
        if (response.status === 404) {
          friendlyMessage = "No articles available for this section.";
        } else if (response.status === 429) {
          friendlyMessage =
            "Too many requests. Please wait a moment and try again.";
        } else if (response.status >= 500) {
          friendlyMessage =
            "Server is temporarily unavailable. Please try again later.";
        }

        throw new ApiError(friendlyMessage, response.status, errorData);
      }

      const data = await response.json();

      if (data.status !== "OK") {
        throw new ApiError(
          "Unable to load articles. Please try again.",
          500,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Network error or other fetch error
      throw new ApiError(
        "Network connection issue. Please check your internet and try again.",
        0,
        null
      );
    }
  });
};

/**
 * Transform API response to app format
 *
 * @param {Object} apiResponse - Raw API response
 * @returns {Array} Array of formatted articles
 *
 * @example
 * const formattedArticles = transformArticles(apiResponse);
 */
export const transformArticles = (apiResponse) => {
  if (!apiResponse || !apiResponse.results) {
    return [];
  }

  return apiResponse.results.map((article, index) => ({
    id: article.uri || `article-${index}`,
    title: article.title || "",
    abstract: article.abstract || "",
    byline: article.byline || "Unknown Author",
    publishedDate: article.published_date || new Date().toISOString(),
    updatedDate:
      article.updated_date ||
      article.published_date ||
      new Date().toISOString(),
    section: article.section || "",
    subsection: article.subsection || "",
    url: article.url || "",
    imageUrl:
      article.multimedia && article.multimedia.length > 0
        ? article.multimedia[0].url
        : null,
    caption:
      article.multimedia && article.multimedia.length > 0
        ? article.multimedia[0].caption
        : "",
    geoFacet: article.geo_facet || [],
    desFacet: article.des_facet || [],
    orgFacet: article.org_facet || [],
    perFacet: article.per_facet || [],
  }));
};

/**
 * Fetch and transform top stories in one call
 *
 * @param {string} section - The section to fetch
 * @returns {Promise<Array>} Array of formatted articles
 *
 * @example
 * const articles = await getTopStories('science');
 */
export const getTopStories = async (section = "home") => {
  const response = await fetchTopStories(section);
  return transformArticles(response);
};

export default {
  fetchTopStories,
  transformArticles,
  getTopStories,
  ApiError,
};
