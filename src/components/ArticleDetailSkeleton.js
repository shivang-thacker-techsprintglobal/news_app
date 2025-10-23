/**
 * ArticleDetailSkeleton Component
 *
 * Shimmer loading skeleton for article detail screen
 *
 * @module components/ArticleDetailSkeleton
 */

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Shimmer from "./Shimmer";
import { colors, spacing } from "../theme";

/**
 * ArticleDetailSkeleton Component
 *
 * @returns {JSX.Element} ArticleDetailSkeleton component
 */
const ArticleDetailSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.scrollView}>
        {/* Image shimmer */}
        <Shimmer width="100%" height={300} borderRadius={0} />

        {/* Content */}
        <View style={styles.content}>
          {/* Title shimmers */}
          <Shimmer
            width="100%"
            height={24}
            borderRadius={4}
            style={styles.titleLine}
          />
          <Shimmer
            width="90%"
            height={24}
            borderRadius={4}
            style={styles.titleLine}
          />
          <Shimmer
            width="60%"
            height={24}
            borderRadius={4}
            style={styles.titleLine}
          />

          {/* Author shimmer */}
          <Shimmer
            width={180}
            height={16}
            borderRadius={4}
            style={styles.metadata}
          />

          {/* Time shimmer */}
          <Shimmer
            width={120}
            height={14}
            borderRadius={4}
            style={styles.metadata}
          />

          {/* Abstract shimmers */}
          <View style={styles.abstractContainer}>
            <Shimmer
              width="100%"
              height={16}
              borderRadius={4}
              style={styles.abstractLine}
            />
            <Shimmer
              width="100%"
              height={16}
              borderRadius={4}
              style={styles.abstractLine}
            />
            <Shimmer
              width="100%"
              height={16}
              borderRadius={4}
              style={styles.abstractLine}
            />
            <Shimmer
              width="95%"
              height={16}
              borderRadius={4}
              style={styles.abstractLine}
            />
            <Shimmer
              width="85%"
              height={16}
              borderRadius={4}
              style={styles.abstractLine}
            />
          </View>

          {/* Tags shimmer */}
          <View style={styles.tagsContainer}>
            <Shimmer
              width={80}
              height={28}
              borderRadius={14}
              style={styles.tag}
            />
            <Shimmer
              width={100}
              height={28}
              borderRadius={14}
              style={styles.tag}
            />
          </View>

          {/* Button shimmer */}
          <Shimmer
            width="100%"
            height={48}
            borderRadius={8}
            style={styles.button}
          />
        </View>
      </ScrollView>

      {/* Back button shimmer */}
      <View style={styles.backButtonContainer}>
        <Shimmer width="100%" height={48} borderRadius={8} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  titleLine: {
    marginBottom: spacing.sm,
  },
  metadata: {
    marginBottom: spacing.sm,
  },
  abstractContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  abstractLine: {
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: spacing.lg,
  },
  tag: {
    marginRight: spacing.sm,
  },
  button: {
    marginTop: spacing.md,
  },
  backButtonContainer: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
  },
});

export default ArticleDetailSkeleton;
