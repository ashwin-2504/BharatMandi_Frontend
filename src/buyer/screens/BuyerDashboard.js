import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import OrderItem from "../../seller/components/OrderItem";

const BuyerDashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    purchases: "0",
    orders: "0",
    spent: "₹0",
    wishlist: "0",
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
    }, [])
  );

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Mock buyer ID for stats
      const buyerId = "seller_123"; // Reusing for now to show data
      const [statsData, ordersData] = await Promise.all([
        apiService.getSellerStats(buyerId),
        apiService.getSellerOrders(buyerId)
      ]);
      
      setStats({
        purchases: statsData.ordersCount.toString(),
        orders: statsData.pendingOrdersCount.toString(),
        spent: `₹${statsData.revenue}`,
        wishlist: "0",
      });
      setRecentOrders(ordersData);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    navigation.navigate("Marketplace");
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
              <Feather name="shopping-cart" size={24} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.welcomeTitle}>Buyer Dashboard</Text>
              <Text style={styles.welcomeSubtitle}>Browse and buy agricultural products</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatsCard title="Total Purchases" value={stats.purchases} icon="shopping-bag" />
          <StatsCard title="Active Orders" value={stats.orders} icon="truck" />
          <StatsCard title="Total Spent" value={stats.spent} icon="credit-card" />
          <StatsCard title="Wishlist Items" value={stats.wishlist} icon="heart" />
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.titleWithIcon}>
            <Feather name="award" size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Marketplace</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleSearch}
          >
            <Feather name="search" size={16} color={COLORS.white} style={{ marginRight: 4 }} />
            <Text style={styles.addButtonText}>Explore All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Discover fresh produce directly from farmers!</Text>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.titleWithIcon}>
            <Feather name="shopping-bag" size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>My Recent Orders ({recentOrders.length})</Text>
          </View>
        </View>

        {recentOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No orders yet</Text>
          </View>
        ) : (
          <View style={styles.orderList}>
            {recentOrders.slice(0, 5).map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </View>
        )}
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
});

export default BuyerDashboard;
