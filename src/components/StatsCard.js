import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from "../theme/theme";

const StatsCard = ({ title, value, icon }) => {
  return (
    <View style={[styles.card, SHADOWS.light]}>
      <View style={styles.iconPlaceholder}>
        {/* Placeholder for icons, in real app use @expo/vector-icons */}
        <View style={styles.box} />
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    width: "48%",
    marginBottom: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconPlaceholder: {
    marginRight: SPACING.sm,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: COLORS.primaryLight,
  },
  content: {
    flex: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  title: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: "600",
    marginTop: 2,
  },
});

export default StatsCard;
