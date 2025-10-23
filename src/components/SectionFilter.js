/**
 * SectionFilter Component
 *
 * Displays a horizontal list of section filter buttons
 * Allows users to switch between different news sections
 *
 * @module components/SectionFilter
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors, typography, spacing, moderateScale, scale } from "../theme";
import { SECTION_LABELS, DEFAULT_SECTIONS } from "../api/config";

/**
 * SectionFilter Component
 *
 * @param {Object} props - Component props
 * @param {string} props.selectedSection - Currently selected section
 * @param {Function} props.onSelectSection - Function to call when section is selected
 * @returns {JSX.Element} SectionFilter component
 *
 * @example
 * <SectionFilter
 *   selectedSection="world"
 *   onSelectSection={(section) => setSection(section)}
 * />
 */
const SectionFilter = ({ selectedSection, onSelectSection }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Section</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {DEFAULT_SECTIONS.map((section) => {
          const isSelected = selectedSection === section;
          return (
            <TouchableOpacity
              key={section}
              style={[
                styles.filterButton,
                isSelected && styles.filterButtonSelected,
              ]}
              onPress={() => onSelectSection(section)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  isSelected && styles.filterTextSelected,
                ]}
              >
                {SECTION_LABELS[section] || section}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    // paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: moderateScale(typography.fontSize.md),
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  scrollContent: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: moderateScale(8),
    backgroundColor: colors.filterUnselected,
    borderWidth: 1,
    borderColor: colors.filterBorder,
    marginRight: spacing.sm,
    minWidth: scale(80),
    alignItems: "center",
  },
  filterButtonSelected: {
    backgroundColor: colors.white,
    borderColor: colors.filterSelected,
    borderWidth: 2,
  },
  filterText: {
    fontSize: moderateScale(typography.fontSize.sm),
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  filterTextSelected: {
    color: colors.filterSelected,
    fontWeight: typography.fontWeight.bold,
  },
});

export default SectionFilter;
