/**
 * ArticleDetailScreen Component
 *
 * Displays full article details including:
 * - Article image with caption
 * - Title and metadata
 * - Abstract/body
 * - Link to full article
 *
 * @module screens/ArticleDetailScreen
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  typography,
  spacing,
  moderateScale,
  verticalScale,
} from "../theme";
import { formatTimeAgo } from "../utils";
import { ArticleDetailSkeleton } from "../components";

/**
 * ArticleDetailScreen Component
 *
 * @param {Object} props - Component props
 * @param {Object} props.route - Route object with article parameter
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} ArticleDetailScreen component
 */
const ArticleDetailScreen = ({ route, navigation }) => {
  const { article } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Simulate initial loading for smooth transition
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Handle back button press
   */
  const handleBack = () => {
    navigation.goBack();
  };

  /**
   * Handle read full article press
   */
  const handleReadFullArticle = async () => {
    if (article.url) {
      try {
        const supported = await Linking.canOpenURL(article.url);
        if (supported) {
          await Linking.openURL(article.url);
        }
      } catch (error) {
        console.error("Error opening URL:", error);
      }
    }
  };

  // Show skeleton during initial load
  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={Platform.OS === "android" ? ["top", "bottom"] : ["top"]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Article Image */}
        <View style={styles.imageContainer}>
          {article.imageUrl ? (
            <>
              <Image
                source={{ uri: article.imageUrl }}
                style={styles.image}
                contentFit="cover"
                transition={300}
                cachePolicy="disk"
                priority="high"
              />

              {/* Back Button - Positioned over image */}
              <TouchableOpacity
                style={styles.backButtonOverlay}
                onPress={handleBack}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="arrow-back"
                  size={moderateScale(24)}
                  color={colors.white}
                />
              </TouchableOpacity>

              {article.caption && (
                <View style={styles.captionContainer}>
                  <Text style={styles.caption}>Caption: {article.caption}</Text>
                </View>
              )}
            </>
          ) : (
            <>
              <View style={styles.placeholderContainer}>
                <Ionicons
                  name="image-outline"
                  size={moderateScale(80)}
                  color={colors.textTertiary}
                />
              </View>

              {/* Back Button - Positioned over placeholder */}
              <TouchableOpacity
                style={styles.backButtonOverlay}
                onPress={handleBack}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="arrow-back"
                  size={moderateScale(24)}
                  color={colors.white}
                />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Article Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{article.title}</Text>

          {/* Metadata */}
          <View style={styles.metadata}>
            <Text style={styles.author}>
              {article.byline || "Unknown Author"}
            </Text>
            <Text style={styles.time}>
              Published: {formatTimeAgo(article.publishedDate)}
            </Text>
          </View>

          {/* Abstract */}
          {article.abstract && (
            <Text style={styles.abstract}>{article.abstract}</Text>
          )}

          {/* Section Info */}
          {(article.section || article.subsection) && (
            <View style={styles.sectionInfo}>
              {article.section && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{article.section}</Text>
                </View>
              )}
              {article.subsection && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{article.subsection}</Text>
                </View>
              )}
            </View>
          )}

          {/* Read Full Article Button */}
          {article.url && (
            <TouchableOpacity
              style={styles.readButton}
              onPress={handleReadFullArticle}
            >
              <Text style={styles.readButtonText}>Read Full Article</Text>
              <Ionicons
                name="open-outline"
                size={moderateScale(20)}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
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
    width: "100%",
    height: verticalScale(300),
    backgroundColor: colors.placeholderBackground,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonOverlay: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: moderateScale(20),
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  captionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  caption: {
    fontSize: moderateScale(typography.fontSize.xs),
    fontStyle: "italic",
    color: colors.white,
  },
  content: {
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: moderateScale(typography.fontSize.xxl),
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: moderateScale(32),
  },
  metadata: {
    marginBottom: spacing.lg,
  },
  author: {
    fontSize: moderateScale(typography.fontSize.md),
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  time: {
    fontSize: moderateScale(typography.fontSize.sm),
    color: colors.textTertiary,
  },
  abstract: {
    fontSize: moderateScale(typography.fontSize.md),
    color: colors.textPrimary,
    lineHeight: moderateScale(24),
    marginBottom: spacing.lg,
  },
  sectionInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: moderateScale(16),
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagText: {
    fontSize: moderateScale(typography.fontSize.xs),
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
    textTransform: "uppercase",
  },
  readButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: moderateScale(8),
    marginTop: spacing.md,
  },
  readButtonText: {
    fontSize: moderateScale(typography.fontSize.md),
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
    marginRight: spacing.sm,
  },
});

export default ArticleDetailScreen;
