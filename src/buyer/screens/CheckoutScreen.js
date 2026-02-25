import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS } from "../../shared/theme/theme";
import apiService from "../../shared/services/apiService";

const CheckoutScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [step, setStep] = useState(1); // 1: Select, 2: Init, 3: Confirm
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    name: "John Doe",
    address: "123 Farmer St, Agriville",
    phone: "9876543210",
  });

  const sessionId = "session_" + Date.now();
  const flowId = "agricultural_flow_1";

  // Step 1: Select
  const handleSelect = async () => {
    setLoading(true);
    try {
      const result = await apiService.search(sessionId, flowId);
      if (result.success && result.data.transactionId) {
        setTransactionId(result.data.transactionId);
        
        // Advance to next step simulation (Proceed select)
        await apiService.select(result.data.transactionId, { 
          item_id: product.id,
          quantity: 1 
        });
        
        setStep(2);
      } else {
        throw new Error("Failed to start transaction");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to initiate select: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Init
  const handleInit = async () => {
    setLoading(true);
    try {
      await apiService.init(transactionId, { 
        billing: shippingInfo,
        fulfillment: { type: "DELIVERY" }
      });
      setStep(3);
    } catch (error) {
      Alert.alert("Error", "Failed to initialize order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Confirm
  const handleConfirm = async () => {
    setLoading(true);
    try {
      // In a real ONDC flow, 'confirm' is the final stage. 
      // Our backend is updated to record the order in DB on this call.
      const payload = {
        transactionId,
        inputs: {
          customer_name: shippingInfo.name,
          total_amount: product.price,
          seller_id: product.seller_id,
          items: [{ id: product.id, name: product.name, price: product.price }],
          payment: { type: "COD", status: "PENDING" }
        }
      };
      
      const result = await apiService.confirm(payload.transactionId, payload.inputs);
      
      if (result.success) {
        Alert.alert("Success", "Order placed successfully!", [
          { text: "OK", onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: "BuyerDashboard" }],
          }) }
        ]);
      } else {
        throw new Error("Confirmation failed");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to confirm order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStepHeader = () => {
    return (
      <View style={styles.stepHeader}>
        <View style={styles.stepContainer}>
          <View style={[styles.stepCircle, step >= 1 && styles.activeStep]}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <Text style={styles.stepLabel}>Select</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepContainer}>
          <View style={[styles.stepCircle, step >= 2 && styles.activeStep]}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.stepLabel}>Details</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepContainer}>
          <View style={[styles.stepCircle, step >= 3 && styles.activeStep]}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Confirm</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      {renderStepHeader()}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Review Item</Text>
            <View style={styles.itemRow}>
              <View style={styles.itemImagePlaceholder}>
                <Feather name="box" size={24} color={COLORS.textSecondary} />
              </View>
              <View style={{ flex: 1, marginLeft: SPACING.md }}>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.itemCategory}>{product.category}</Text>
                <Text style={styles.itemPrice}>₹{product.price}</Text>
              </View>
            </View>
            
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>₹{product.price}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>₹0</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{product.price}</Text>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Shipping Details</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={shippingInfo.name}
                onChangeText={(text) => setShippingInfo({...shippingInfo, name: text})}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Shipping Address</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                multiline
                value={shippingInfo.address}
                onChangeText={(text) => setShippingInfo({...shippingInfo, address: text})}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                value={shippingInfo.phone}
                onChangeText={(text) => setShippingInfo({...shippingInfo, phone: text})}
              />
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Final Confirmation</Text>
            <View style={styles.confirmationRow}>
              <Text style={styles.confirmLabel}>Payment Method:</Text>
              <Text style={styles.confirmValue}>Cash on Delivery</Text>
            </View>
            <View style={styles.confirmationRow}>
              <Text style={styles.confirmLabel}>Total Amount:</Text>
              <Text style={styles.confirmTotal}>₹{product.price}</Text>
            </View>
            <View style={styles.confirmationRow}>
              <Text style={styles.confirmLabel}>Delivery to:</Text>
              <Text style={styles.confirmValue}>{shippingInfo.name}</Text>
            </View>
            <Text style={styles.warningText}>By clicking confirm, your order will be placed using ONDC protocol.</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, loading && styles.disabledButton]} 
          onPress={step === 1 ? handleSelect : step === 2 ? handleInit : handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Text style={styles.buttonText}>
                {step === 3 ? "Place Order" : "Proceed"}
              </Text>
              <Feather name="arrow-right" size={20} color={COLORS.white} />
            </>
          )}
        </TouchableOpacity>
      </View>
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Communicating with ONDC Network...</Text>
        </View>
      )}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  backButton: {
    padding: SPACING.xs,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  stepContainer: {
    alignItems: "center",
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  activeStep: {
    backgroundColor: COLORS.primary,
  },
  stepNumber: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
  stepLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.xs,
    marginTop: -15,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.light,
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  itemImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  itemCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    marginTop: 4,
  },
  summaryContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  summaryValue: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  totalRow: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primary,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  confirmationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  confirmLabel: {
    color: COLORS.textSecondary,
  },
  confirmValue: {
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  confirmTotal: {
    fontWeight: "800",
    fontSize: 18,
    color: COLORS.primary,
  },
  warningText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: SPACING.lg,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  button: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.primary,
    fontWeight: "600",
  },
});

export default CheckoutScreen;
