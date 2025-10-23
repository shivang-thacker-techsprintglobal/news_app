/**
 * EmptyState Component
 * 
 * Displays an empty state message when no articles are found
 * 
 * @module components/EmptyState
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme';

/**
 * EmptyState Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Message to display
 * @param {string} props.icon - Icon name from Ionicons
 * @returns {JSX.Element} EmptyState component
 * 
 * @example
 * <EmptyState message="No articles found" icon="newspaper-outline" />
 */
const EmptyState = ({ 
  message = 'No articles found', 
  icon = 'newspaper-outline' 
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={colors.textTertiary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  message: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

export default EmptyState;

