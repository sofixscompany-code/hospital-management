
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/customer/HomeScreen';
import MenuScreen from '../screens/customer/MenuScreen';
import CartScreen from '../screens/customer/CartScreen';
import FoodDetailsScreen from '../screens/customer/FoodDetailsScreen';
import CheckoutScreen from '../screens/customer/CheckoutScreen';
import OrderTrackingScreen from '../screens/customer/OrderTrackingScreen';
import FeedbackScreen from '../screens/customer/FeedbackScreen';
import LoyaltyScreen from '../screens/customer/LoyaltyScreen';
import ProfileScreen from '../screens/customer/ProfileScreen';
import QRScannerScreen from '../screens/qr/QRScannerScreen';

const Stack = createStackNavigator();

const CustomerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="QRScanner" component={QRScannerScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
