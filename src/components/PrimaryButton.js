import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from "../theme/theme";

const PrimaryButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, SHADOWS.medium, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default PrimaryButton;
