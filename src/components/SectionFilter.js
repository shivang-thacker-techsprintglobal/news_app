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
import { LinearGradient } from "expo-linear-gradient";
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

          // Render button with gradient border if selected
          if (isSelected) {
            return (
              <LinearGradient
                key={section}
                colors={["#667eea", "#667eea", "#ffffff"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientWrapper}
              >
                <TouchableOpacity
                  style={styles.filterButtonSelected}
                  onPress={() => onSelectSection(section)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.filterTextSelected}>
                    {SECTION_LABELS[section] || section}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            );
          }

          // Render normal button
          return (
            <TouchableOpacity
              key={section}
              style={styles.filterButton}
              onPress={() => onSelectSection(section)}
              activeOpacity={0.7}
            >
              <Text style={styles.filterText}>
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
    borderWidth: 0,
    borderColor: colors.filterBorder,
    marginRight: spacing.sm,
    minWidth: scale(80),
    alignItems: "center",
  },
  gradientWrapper: {
    borderRadius: moderateScale(8),
    marginRight: spacing.sm,
    padding: 1.5,

    // This creates the gradient border effect (thinner border)
  },
  filterButtonSelected: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: moderateScale(6), // Slightly smaller to show gradient border
    backgroundColor: colors.white,
    minWidth: scale(80),
    alignItems: "center",
  },
  filterText: {
    fontSize: moderateScale(typography.fontSize.sm),
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  filterTextSelected: {
    fontSize: moderateScale(typography.fontSize.sm),
    color: colors.filterSelected,
    fontWeight: typography.fontWeight.bold,
  },
});

export default SectionFilter;
