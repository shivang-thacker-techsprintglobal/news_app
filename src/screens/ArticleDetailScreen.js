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
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors, typography, spacing } from "../theme";
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
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.scrollView}>
        {/* Article Image */}
        <View style={styles.imageContainer}>
          {article.imageUrl ? (
            <>
              <Image
                source={{ uri: article.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
              {article.caption && (
                <View style={styles.captionContainer}>
                  <Text style={styles.caption}>Caption: {article.caption}</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons
                name="image-outline"
                size={80}
                color={colors.textTertiary}
              />
            </View>
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
              <Ionicons name="open-outline" size={20} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableOpacity>
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
    height: 300,
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
    fontSize: typography.fontSize.xs,
    fontStyle: "italic",
    color: colors.white,
  },
  content: {
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: 32,
  },
  metadata: {
    marginBottom: spacing.lg,
  },
  author: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  time: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
  },
  abstract: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    lineHeight: 24,
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
    borderRadius: 16,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagText: {
    fontSize: typography.fontSize.xs,
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
    borderRadius: 8,
    marginTop: spacing.md,
  },
  readButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
    marginRight: spacing.sm,
  },
  backButton: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    letterSpacing: 1,
  },
});

export default ArticleDetailScreen;
