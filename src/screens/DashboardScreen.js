import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS } from "../theme/theme";
import StatsCard from "../components/StatsCard";

const DashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>BharatMandi</Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Farmer Dashboard</Text>
          <Text style={styles.welcomeSubtitle}>Manage your products and orders</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatsCard title="Active Products" value="0" icon="package" />
          <StatsCard title="Total Orders" value="0" icon="shopping-cart" />
          <StatsCard title="Total Revenue" value="₹0" icon="trending-up" />
          <StatsCard title="Pending Orders" value="0" icon="box" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Products</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Product</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No products yet. Add your first product!</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No orders yet</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
  },
  logoutButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoutText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  welcomeSection: {
    marginBottom: SPACING.lg,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
  emptyState: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    marginBottom: SPACING.lg,
  },
  emptyStateText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
  },
});

export default DashboardScreen;
