import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from "../theme/theme";

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = ["Farmer", "Buyer"];

  return (
    <View style={styles.container}>
      {roles.map((role) => {
        const isSelected = selectedRole === role;
        return (
          <TouchableOpacity
            key={role}
            activeOpacity={0.7}
            onPress={() => onRoleChange(role)}
            style={[
              styles.roleBtn,
              isSelected ? styles.selectedBtn : styles.unselectedBtn,
              isSelected && SHADOWS.light,
            ]}
          >
            <Text
              style={[
                styles.roleText,
                isSelected ? styles.selectedText : styles.unselectedText,
              ]}
            >
              {role}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: SPACING.lg,
  },
  roleBtn: {
    flex: 0.48,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    borderWidth: 1,
  },
  selectedBtn: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  unselectedBtn: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  roleText: {
    fontSize: 16,
    fontWeight: "700",
  },
  selectedText: {
    color: COLORS.primary,
  },
  unselectedText: {
    color: COLORS.textSecondary,
  },
});

export default RoleSelector;
