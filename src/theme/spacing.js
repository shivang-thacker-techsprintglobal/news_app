/**
 * Spacing System
 *
 * Consistent spacing values for margins, paddings, and gaps
 * Includes responsive dimensions based on screen size
 *
 * @module theme/spacing
 */

import { Dimensions } from "react-native";

// Get device dimensions
const { width, height } = Dimensions.get("window");

/**
 * Base dimensions for scaling calculations
 * Based on iPhone 11 Pro (375x812)
 */
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Scale function for responsive width
 * @param {number} size - Size to scale
 * @returns {number} Scaled size based on screen width
 */
export const scale = (size) => (width / guidelineBaseWidth) * size;

/**
 * Scale function for responsive height
 * @param {number} size - Size to scale
 * @returns {number} Scaled size based on screen height
 */
export const verticalScale = (size) => (height / guidelineBaseHeight) * size;

/**
 * Moderate scale function (less aggressive scaling)
 * @param {number} size - Size to scale
 * @param {number} factor - Scaling factor (default 0.5)
 * @returns {number} Moderately scaled size
 */
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/**
 * Get percentage of screen width
 * @param {number} percent - Percentage (0-100)
 * @returns {number} Width value
 */
export const widthPercentage = (percent) => (width * percent) / 100;

/**
 * Get percentage of screen height
 * @param {number} percent - Percentage (0-100)
 * @returns {number} Height value
 */
export const heightPercentage = (percent) => (height * percent) / 100;

/**
 * Fixed spacing values (responsive)
 */
export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
  xxxl: moderateScale(64),
};

/**
 * Screen dimensions
 */
export const metrics = {
  screenWidth: width,
  screenHeight: height,
};

/**
 * Helper function to get spacing values
 * @param {string|number} size - Size key or custom number
 * @returns {number} Spacing value
 */
export const getSpacing = (size) => {
  if (typeof size === "number") return moderateScale(size);
  return spacing[size] || spacing.md;
};
