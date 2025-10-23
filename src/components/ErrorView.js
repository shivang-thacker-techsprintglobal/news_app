/**
 * ErrorView Component
 *
 * Displays error message with retry option
 *
 * @module components/ErrorView
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing, moderateScale } from "../theme";

/**
 * ErrorView Component
 *
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Function to call when retry is pressed
 * @returns {JSX.Element} ErrorView component
 *
 * @example
 * <ErrorView message="Failed to load articles" onRetry={handleRetry} />
 */
const ErrorView = ({ message = "Something went wrong", onRetry }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="alert-circle-outline"
        size={moderateScale(64)}
        color={colors.error}
      />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  message: {
    fontSize: moderateScale(typography.fontSize.lg),
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: moderateScale(8),
  },
  buttonText: {
    fontSize: moderateScale(typography.fontSize.md),
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
});

export default ErrorView;
