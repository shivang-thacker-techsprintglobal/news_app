/**
 * Spacing System
 * 
 * Consistent spacing values for margins, paddings, and gaps
 * 
 * @module theme/spacing
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

/**
 * Helper function to get spacing values
 * @param {string|number} size - Size key or custom number
 * @returns {number} Spacing value
 */
export const getSpacing = (size) => {
  if (typeof size === 'number') return size;
  return spacing[size] || spacing.md;
};

