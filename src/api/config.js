/**
 * API Configuration
 *
 * Contains API endpoints and configuration for NYT Top Stories API
 *
 * @module api/config
 */

import { NYT_API_KEY, API_BASE_URL, API_TIMEOUT } from "@env";

/**
 * NYT API Configuration
 * API key is loaded from .env file
 * Get your API key from: https://developer.nytimes.com/get-started
 */
export const API_CONFIG = {
  BASE_URL: API_BASE_URL || "https://api.nytimes.com/svc/topstories/v2",
  API_KEY: NYT_API_KEY || "YOUR_API_KEY_HERE",
  TIMEOUT: parseInt(API_TIMEOUT || "10000", 10), // 10 seconds
};

/**
 * Available sections for NYT Top Stories
 */
export const SECTIONS = [
  "home",
  "arts",
  "automobiles",
  "books",
  "business",
  "fashion",
  "food",
  "health",
  "insider",
  "magazine",
  "movies",
  "nyregion",
  "obituaries",
  "opinion",
  "politics",
  "realestate",
  "science",
  "sports",
  "sundayreview",
  "technology",
  "theater",
  "t-magazine",
  "travel",
  "upshot",
  "us",
  "world",
];

/**
 * Section display names mapping
 */
export const SECTION_LABELS = {
  home: "Home",
  world: "World",
  arts: "Arts",
  science: "Science",
  sports: "Sports",
  opinion: "Opinion",
  travel: "Travel",
  technology: "Technology",
  business: "Business",
  politics: "Politics",
  health: "Health",
  food: "Food",
  fashion: "Fashion",
  movies: "Movies",
  theater: "Theater",
  books: "Books",
};

/**
 * Default sections to show in the filter
 */
export const DEFAULT_SECTIONS = [
  "home",
  "world",
  "arts",
  "science",
  "sports",
  "opinion",
];
