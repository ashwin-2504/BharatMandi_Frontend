import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS } from "../../shared/theme/theme";
import StatsCard from "../../shared/components/StatsCard";
import { Feather } from "@expo/vector-icons";
import apiService from "../../shared/services/apiService";

const SellerDashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    products: "0",
    orders: "0",
    revenue: "₹0",
    pending: "0",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // For mock purposes, using 'seller_123'
      const products = await apiService.getSellerProducts("seller_123");
      
      setStats({
        products: products.length.toString(),
        orders: "0",
        revenue: "₹0",
        pending: "0",
      });
    } catch (error) {
      console.error("Failed to fetch seller dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Feather name="shopping-bag" size={24} color={COLORS.primary} style={styles.logoIcon} />
          <Text style={styles.logoText}>BharatMandi</Text>
        </View>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Feather name="log-out" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <View style={styles.welcomeIconContainer}>
              <Feather name="user" size={24} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.welcomeTitle}>Seller Dashboard</Text>
              <Text style={styles.welcomeSubtitle}>Manage your products and orders</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatsCard title="Active Products" value={stats.products} icon="box" />
          <StatsCard title="Total Orders" value={stats.orders} icon="file-text" />
          <StatsCard title="Total Revenue" value={stats.revenue} icon="pie-chart" />
          <StatsCard title="Pending Orders" value={stats.pending} icon="clock" />
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.titleWithIcon}>
            <Feather name="box" size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>My Products ({stats.products})</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddProduct}
          >
            <Feather name="plus" size={16} color={COLORS.white} style={{ marginRight: 4 }} />
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginVertical: SPACING.md }} />
        ) : stats.products === "0" ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No products yet. Add your first product!</Text>
          </View>
        ) : (
          <View style={styles.productList}>
            {/* List rendering logic would go here, for now just a simple placeholder to show we have products */}
            <Text style={styles.productCountText}>Currently showing {stats.products} products.</Text>
            {/* In a real implementation, we'd map over the products array */}
          </View>
        )}

        <View style={styles.sectionHeader}>
          <View style={styles.titleWithIcon}>
            <Feather name="list" size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Recent Orders</Text>
          </View>
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
  },
  iconButton: {
    padding: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    display: "none",
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeSection: {
    marginBottom: SPACING.lg,
  },
  welcomeHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
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
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  titleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionIcon: {
    marginRight: 8,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
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
  productList: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  productCountText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SellerDashboard;
