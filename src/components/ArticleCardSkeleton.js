/**
 * ArticleCardSkeleton Component
 *
 * Shimmer loading skeleton for article cards
 *
 * @module components/ArticleCardSkeleton
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import Shimmer from "./Shimmer";
import { colors, spacing } from "../theme";

/**
 * ArticleCardSkeleton Component
 *
 * @returns {JSX.Element} ArticleCardSkeleton component
 */
const ArticleCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Image shimmer */}
      <Shimmer width={120} height={120} borderRadius={8} style={styles.image} />

      {/* Content shimmer */}
      <View style={styles.content}>
        {/* Section tag shimmer */}
        <Shimmer
          width={80}
          height={20}
          borderRadius={12}
          style={styles.section}
        />

        {/* Title shimmers */}
        <Shimmer
          width="100%"
          height={16}
          borderRadius={4}
          style={styles.titleLine}
        />
        <Shimmer
          width="90%"
          height={16}
          borderRadius={4}
          style={styles.titleLine}
        />

        {/* Abstract shimmers */}
        <Shimmer
          width="100%"
          height={14}
          borderRadius={4}
          style={styles.abstractLine}
        />
        <Shimmer
          width="85%"
          height={14}
          borderRadius={4}
          style={styles.abstractLine}
        />

        {/* Metadata shimmer */}
        <Shimmer
          width={150}
          height={12}
          borderRadius={4}
          style={styles.metadata}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  section: {
    marginBottom: spacing.xs,
  },
  titleLine: {
    marginBottom: spacing.xs,
  },
  abstractLine: {
    marginBottom: spacing.xs,
  },
  metadata: {
    marginTop: spacing.xs,
  },
});

export default ArticleCardSkeleton;
