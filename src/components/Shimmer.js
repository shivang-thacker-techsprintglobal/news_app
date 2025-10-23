/**
 * Shimmer Component
 *
 * Base shimmer/skeleton loading animation component
 *
 * @module components/Shimmer
 */

import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors, moderateScale } from "../theme";

/**
 * Shimmer Component
 *
 * Creates a sliding wave shimmer effect for loading states
 *
 * @param {Object} props - Component props
 * @param {number} props.width - Width of shimmer element
 * @param {number} props.height - Height of shimmer element
 * @param {number} props.borderRadius - Border radius
 * @param {Object} props.style - Additional styles
 * @returns {JSX.Element} Shimmer component
 */
const Shimmer = ({ width = "100%", height = 20, borderRadius = 4, style }) => {
  const shimmerTranslate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerTranslate, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerTranslate]);

  const translateX = shimmerTranslate.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 400],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      {/* Shimmer wave effect - creates a sliding highlight */}
      <Animated.View
        style={[
          styles.shimmerWave,
          {
            transform: [{ translateX }, { rotate: "-10deg" }],
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
    position: "relative",
  },
  shimmerWave: {
    width: 200,
    height: "200%",
    position: "absolute",
    top: "-50%",
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default Shimmer;
