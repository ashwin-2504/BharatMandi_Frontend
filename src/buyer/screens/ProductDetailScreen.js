import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS } from "../../shared/theme/theme";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const handleBuyNow = () => {
    // Navigate to checkout with product info
    navigation.navigate("Checkout", { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Feather name="shopping-cart" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          {product.image_url ? (
            <Image source={{ uri: product.image_url }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <Feather name="image" size={64} color={COLORS.border} />
            </View>
          )}
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.category}>{product.category}</Text>
            </View>
            <View style={styles.priceBadge}>
              <Text style={styles.price}>₹{product.price}</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Feather name="box" size={18} color={COLORS.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Stock Status</Text>
                <Text style={[styles.infoValue, product.stock_quantity < 5 && styles.lowStock]}>
                  {product.stock_quantity} available
                </Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Feather name="user" size={18} color={COLORS.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Seller ID</Text>
                <Text style={styles.infoValue}>{product.seller_id}</Text>
              </View>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product.description || "No description provided for this product. High-quality agricultural produce directly from the source."}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.wishlistButton}>
          <Feather name="heart" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
          <Feather name="chevron-right" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  backButton: {
    padding: SPACING.xs,
  },
  cartButton: {
    padding: SPACING.xs,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: COLORS.background,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsSection: {
    padding: SPACING.lg,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.lg,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  category: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  priceBadge: {
    backgroundColor: COLORS.primary + "15",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoTextContainer: {
    marginLeft: SPACING.sm,
  },
  infoLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  lowStock: {
    color: "#F44336",
  },
  descriptionContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: "center",
  },
  wishlistButton: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  buyButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  buyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
});

export default ProductDetailScreen;
