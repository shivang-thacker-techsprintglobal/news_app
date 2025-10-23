/**
 * ArticleCard Component
 *
 * Displays a single article in a card format with:
 * - Article image (or placeholder)
 * - Title
 * - Author
 * - Published time
 *
 * @module components/ArticleCard
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing, moderateScale, scale } from "../theme";
import { formatTimeAgo } from "../utils";

/**
 * ArticleCard Component
 *
 * @param {Object} props - Component props
 * @param {Object} props.article - Article object
 * @param {Function} props.onPress - Function to call when card is pressed
 * @returns {JSX.Element} ArticleCard component
 *
 * @example
 * <ArticleCard
 *   article={article}
 *   onPress={() => navigation.navigate('ArticleDetail', { article })}
 * />
 */
const ArticleCard = ({ article, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Article Image */}
      <View style={styles.imageContainer}>
        {article.imageUrl ? (
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={200}
            cachePolicy="disk"
          />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons
              name="image-outline"
              size={moderateScale(40)}
              color={colors.textTertiary}
            />
          </View>
        )}
      </View>

      {/* Article Details */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>

        {/* Author */}
        <Text style={styles.author} numberOfLines={1}>
          {article.byline || "Unknown Author"}
        </Text>

        {/* Published Time */}
        <Text style={styles.time}>
          Published: {formatTimeAgo(article.publishedDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.cardBackground,
    borderRadius: moderateScale(12),
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },
  imageContainer: {
    width: scale(100),
    height: scale(100),
    borderRadius: moderateScale(8),
    overflow: "hidden",
    marginRight: spacing.md,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.placeholderBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: moderateScale(typography.fontSize.md),
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  author: {
    fontSize: moderateScale(typography.fontSize.sm),
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  time: {
    fontSize: moderateScale(typography.fontSize.xs),
    color: colors.textTertiary,
  },
});

export default ArticleCard;
