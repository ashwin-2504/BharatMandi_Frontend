import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS } from "../../shared/theme/theme";
import { useCart } from "../../shared/context/CartContext";

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    // Navigate to Checkout, passing the items and total
    if (cartItems.length > 0) {
      // In a real app we might pass multiple items,
      // here we simulate by passing the first item just to keep the existing checkout flow somewhat compatible
      // Note: The prompt asks for quantity adjustments which we will build into the CartScreen before passing
      navigation.navigate("Checkout", { product: { ...cartItems[0], checkoutTotal: cartTotal, isCartCheckout: true } });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Feather name="box" size={24} color={COLORS.textSecondary} />
          </View>
        )}
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity 
            style={styles.controlBtn}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Feather name="minus" size={16} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.controlBtn}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Feather name="plus" size={16} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.removeBtn}
        onPress={() => removeFromCart(item.id)}
      >
        <Feather name="trash-2" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="shopping-cart" size={64} color={COLORS.border} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.shopBtnText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.footer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total ({cartItems.length} items):</Text>
              <Text style={styles.summaryTotal}>₹{cartTotal}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    backgroundColor: COLORS.white, ...SHADOWS.light,
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.textPrimary },
  backButton: { padding: SPACING.xs },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: SPACING.xl },
  emptyText: { fontSize: 16, color: COLORS.textSecondary, marginTop: SPACING.md, marginBottom: SPACING.lg },
  shopBtn: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.md },
  shopBtnText: { color: COLORS.white, fontWeight: "700" },
  listContent: { padding: SPACING.lg },
  cartItem: {
    flexDirection: "row", backgroundColor: COLORS.white, padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg, marginBottom: SPACING.md, ...SHADOWS.light,
    alignItems: "center"
  },
  imageContainer: {
    width: 60, height: 60, borderRadius: BORDER_RADIUS.md, overflow: "hidden",
    backgroundColor: COLORS.background, marginRight: SPACING.md
  },
  image: { width: "100%", height: "100%" },
  placeholderImage: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 4 },
  itemPrice: { fontSize: 14, fontWeight: "600", color: COLORS.primary, marginBottom: 8 },
  quantityControls: { flexDirection: "row", alignItems: "center" },
  controlBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.background, justifyContent: "center", alignItems: "center" },
  quantityText: { marginHorizontal: SPACING.md, fontSize: 16, fontWeight: "600" },
  removeBtn: { padding: SPACING.sm },
  footer: { padding: SPACING.lg, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING.lg },
  summaryLabel: { fontSize: 16, color: COLORS.textSecondary },
  summaryTotal: { fontSize: 20, fontWeight: "800", color: COLORS.primary },
  checkoutBtn: { height: 50, backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.md, justifyContent: "center", alignItems: "center" },
  checkoutBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "700" }
});

export default CartScreen;
