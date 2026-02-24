import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SellerDashboard from '../../seller/screens/SellerDashboard';
import AddProductScreen from '../../seller/screens/AddProductScreen';
import BuyerDashboard from '../../buyer/screens/BuyerDashboard';
import MarketplaceScreen from '../../buyer/screens/MarketplaceScreen';
import ProductDetailScreen from '../../buyer/screens/ProductDetailScreen';
import CheckoutScreen from '../../buyer/screens/CheckoutScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="BuyerDashboard" component={BuyerDashboard} />
      <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};
