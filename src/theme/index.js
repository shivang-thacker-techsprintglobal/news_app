/**
 * Theme Index
 * 
 * Exports all theme-related modules
 * 
 * @module theme
 */

export { colors } from './colors';
export { typography } from './typography';
export { spacing, getSpacing } from './spacing';

// Combined theme object
export const theme = {
  colors: require('./colors').colors,
  typography: require('./typography').typography,
  spacing: require('./spacing').spacing,
};

