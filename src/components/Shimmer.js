/**
 * Shimmer Component
 *
 * Base shimmer/skeleton loading animation component
 *
 * @module components/Shimmer
 */

import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "../theme";

/**
 * Shimmer Component
 *
 * @param {Object} props - Component props
 * @param {number} props.width - Width of shimmer element
 * @param {number} props.height - Height of shimmer element
 * @param {number} props.borderRadius - Border radius
 * @param {Object} props.style - Additional styles
 * @returns {JSX.Element} Shimmer component
 */
const Shimmer = ({ width = "100%", height = 20, borderRadius = 4, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            opacity,
            borderRadius,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.placeholderBackground,
    overflow: "hidden",
  },
  shimmer: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.divider,
  },
});

export default Shimmer;
