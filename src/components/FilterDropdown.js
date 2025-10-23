/**
 * FilterDropdown Component
 *
 * A dropdown selector for filtering articles
 * Used for location and keyword filters
 *
 * @module components/FilterDropdown
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing } from "../theme";

/**
 * FilterDropdown Component
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the dropdown
 * @param {string} props.value - Current selected value
 * @param {Function} props.onChange - Function to call when selection changes
 * @param {string} props.placeholder - Placeholder text
 * @param {Array} props.options - Array of dropdown options
 * @returns {JSX.Element} FilterDropdown component
 *
 * @example
 * <FilterDropdown
 *   label="LOCATION"
 *   value={location}
 *   onChange={handleLocationChange}
 *   placeholder="Filter by location"
 *   options={['New York', 'London', 'Paris']}
 * />
 */
const FilterDropdown = ({
  label,
  value,
  onChange,
  placeholder,
  options = [],
}) => {
  const [showModal, setShowModal] = useState(false);

  /**
   * Handle option selection
   */
  const handleSelectOption = (item) => {
    onChange(item);
    setShowModal(false);
  };

  /**
   * Clear filter
   */
  const handleClear = () => {
    onChange("");
    setShowModal(false);
  };

  /**
   * Open dropdown modal
   */
  const handleOpenDropdown = () => {
    if (options.length > 0) {
      setShowModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={handleOpenDropdown}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.inputText, !value && styles.placeholder]}
            numberOfLines={1}
          >
            {value || placeholder}
          </Text>
          {value ? (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              style={styles.iconButton}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ) : (
            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.textSecondary}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Options Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {label}</Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Options List */}
            <ScrollView style={styles.optionsList}>
              {options.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No options available</Text>
                </View>
              ) : (
                <>
                  {/* Clear option */}
                  {value && (
                    <TouchableOpacity
                      style={[styles.optionItem, styles.clearOption]}
                      onPress={handleClear}
                    >
                      <Text style={styles.clearOptionText}>Clear Filter</Text>
                      <Ionicons
                        name="close-circle"
                        size={20}
                        color={colors.error}
                      />
                    </TouchableOpacity>
                  )}

                  {/* Regular options */}
                  {options.map((item, index) => (
                    <TouchableOpacity
                      key={`option-${index}`}
                      style={[
                        styles.optionItem,
                        value === item && styles.selectedOption,
                      ]}
                      onPress={() => handleSelectOption(item)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          value === item && styles.selectedOptionText,
                        ]}
                      >
                        {item}
                      </Text>
                      {value === item && (
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  inputContainer: {
    paddingHorizontal: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  inputText: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.textTertiary,
  },
  iconButton: {
    padding: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  modalTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  optionsList: {
    maxHeight: 400,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  selectedOption: {
    backgroundColor: colors.primaryLight || "#E3F2FD",
  },
  optionText: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  selectedOptionText: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  clearOption: {
    backgroundColor: "#FFF3F3",
  },
  clearOptionText: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.error,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default FilterDropdown;
