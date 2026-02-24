import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS } from '../../shared/theme/theme';

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {product.image_url ? (
          <Image source={{ uri: product.image_url }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Feather name="box" size={24} color={COLORS.textSecondary} />
          </View>
        )}
      </View>
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>₹{product.price}</Text>
          <View style={styles.stockBadge}>
            <Text style={[styles.stockText, product.stock_quantity < 5 && styles.lowStock]}>
              Stock: {product.stock_quantity}
            </Text>
          </View>
        </View>
      </View>
      <Feather name="chevron-right" size={20} color={COLORS.border} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    marginRight: SPACING.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  category: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },
  stockBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  stockText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  lowStock: {
    color: '#FF4444',
    fontWeight: '700',
  },
});

export default ProductItem;
