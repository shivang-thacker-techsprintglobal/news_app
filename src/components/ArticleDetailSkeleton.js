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
import { colors, spacing, moderateScale, verticalScale, scale } from "../theme";

/**
 * ArticleDetailSkeleton Component
 *
 * @returns {JSX.Element} ArticleDetailSkeleton component
 */
const ArticleDetailSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView style={styles.scrollView}>
        {/* Image shimmer with back button */}
        <View style={styles.imageContainer}>
          <Shimmer width="100%" height={verticalScale(300)} borderRadius={0} />

          {/* Back button shimmer */}
          <View style={styles.backButtonShimmer}>
            <Shimmer
              width={moderateScale(40)}
              height={moderateScale(40)}
              borderRadius={moderateScale(20)}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title shimmers */}
          <Shimmer
            width="100%"
            height={moderateScale(24)}
            borderRadius={moderateScale(4)}
            style={styles.titleLine}
          />
          <Shimmer
            width="90%"
            height={moderateScale(24)}
            borderRadius={moderateScale(4)}
            style={styles.titleLine}
          />
          <Shimmer
            width="60%"
            height={moderateScale(24)}
            borderRadius={moderateScale(4)}
            style={styles.titleLine}
          />

          {/* Author shimmer */}
          <Shimmer
            width={scale(180)}
            height={moderateScale(16)}
            borderRadius={moderateScale(4)}
            style={styles.metadata}
          />

          {/* Time shimmer */}
          <Shimmer
            width={scale(120)}
            height={moderateScale(14)}
            borderRadius={moderateScale(4)}
            style={styles.metadata}
          />

          {/* Abstract shimmers */}
          <View style={styles.abstractContainer}>
            <Shimmer
              width="100%"
              height={moderateScale(16)}
              borderRadius={moderateScale(4)}
              style={styles.abstractLine}
            />
            <Shimmer
              width="100%"
              height={moderateScale(16)}
              borderRadius={moderateScale(4)}
              style={styles.abstractLine}
            />
            <Shimmer
              width="100%"
              height={moderateScale(16)}
              borderRadius={moderateScale(4)}
              style={styles.abstractLine}
            />
            <Shimmer
              width="95%"
              height={moderateScale(16)}
              borderRadius={moderateScale(4)}
              style={styles.abstractLine}
            />
            <Shimmer
              width="85%"
              height={moderateScale(16)}
              borderRadius={moderateScale(4)}
              style={styles.abstractLine}
            />
          </View>

          {/* Tags shimmer */}
          <View style={styles.tagsContainer}>
            <Shimmer
              width={scale(80)}
              height={moderateScale(28)}
              borderRadius={moderateScale(14)}
              style={styles.tag}
            />
            <Shimmer
              width={scale(100)}
              height={moderateScale(28)}
              borderRadius={moderateScale(14)}
              style={styles.tag}
            />
          </View>

          {/* Button shimmer */}
          <Shimmer
            width="100%"
            height={moderateScale(48)}
            borderRadius={moderateScale(8)}
            style={styles.button}
          />
        </View>
      </ScrollView>
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
  imageContainer: {
    position: "relative",
  },
  backButtonShimmer: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    zIndex: 10,
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
});

export default ArticleDetailSkeleton;
