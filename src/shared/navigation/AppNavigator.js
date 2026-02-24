import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SellerDashboard from '../../seller/screens/SellerDashboard';
import BuyerDashboard from '../../buyer/screens/BuyerDashboard';

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
      <Stack.Screen name="BuyerDashboard" component={BuyerDashboard} />
    </Stack.Navigator>
  );
};
