import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS } from "../../shared/theme/theme";
import apiService from "../../shared/services/apiService";

const STATUS_CHOICES = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

const SellerOrderDetailScreen = ({ route, navigation }) => {
  const { order: initialOrder } = route.params;
  const [order, setOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    if (newStatus === order.status) return;

    Alert.alert(
      "Update Order Status",
      `Are you sure you want to change the status to ${newStatus}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          onPress: async () => {
            try {
              setLoading(true);
              const updatedOrder = await apiService.updateOrderStatus(order.id, newStatus);
              setOrder({ ...order, status: updatedOrder.status || newStatus });
              Alert.alert("Success", "Order status updated successfully!");
            } catch (error) {
              console.error("Failed to update status", error);
              Alert.alert("Error", "Could not update order status.");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED': return '#4CAF50';
      case 'PENDING': return '#FF9800';
      case 'SHIPPED': return '#2196F3';
      case 'CANCELLED': return '#F44336';
      default: return COLORS.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order #{order.id.substring(0, 8)}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Feather name="calendar" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{new Date(order.created_at).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Feather name="user" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{order.customer_name || "Unknown Customer"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Feather name="dollar-sign" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailTextBold}>₹{order.total_amount}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Update Status</Text>
        <View style={styles.statusActions}>
          {STATUS_CHOICES.map((status) => (
            <TouchableOpacity 
              key={status}
              style={[
                styles.statusButton, 
                order.status === status && styles.statusButtonActive,
                { borderColor: getStatusColor(status) }
              ]}
              onPress={() => handleStatusUpdate(status)}
              disabled={loading}
            >
              {loading && order.status !== status ? (
                <View style={styles.loadingPlaceholder} />
              ) : (
                <Text style={[
                  styles.statusButtonText, 
                  order.status === status && { color: COLORS.white },
                  order.status !== status && { color: getStatusColor(status) }
                ]}>
                  {status}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {loading && <ActivityIndicator style={{ marginTop: SPACING.md }} color={COLORS.primary} />}

        <View style={styles.itemsSection}>
           <Text style={styles.sectionTitle}>Order Information</Text>
           <View style={styles.card}>
             <Text style={styles.infoText}>Further items and delivery details could be displayed here depending on backend schema expansions.</Text>
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    backgroundColor: COLORS.white, ...SHADOWS.light, zIndex: 10
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.textPrimary },
  backButton: { padding: SPACING.xs },
  scrollContent: { padding: SPACING.lg },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.medium,
    marginBottom: SPACING.lg,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.md,
  },
  orderId: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: "700" },
  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: SPACING.sm },
  detailText: { fontSize: 14, color: COLORS.textSecondary, marginLeft: 8 },
  detailTextBold: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary, marginLeft: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary, marginVertical: SPACING.md },
  statusActions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statusButton: {
    width: "48%",
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
    backgroundColor: COLORS.white,
  },
  statusButtonActive: {
    backgroundColor: COLORS.textPrimary,
    borderColor: COLORS.textPrimary,
  },
  statusButtonText: { fontSize: 14, fontWeight: "700" },
  loadingPlaceholder: { height: 16 },
  itemsSection: { marginTop: SPACING.md },
  infoText: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 20 },
});

export default SellerOrderDetailScreen;
