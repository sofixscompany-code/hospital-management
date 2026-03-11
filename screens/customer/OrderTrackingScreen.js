
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderTrackingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Tracking</Text>
      <Text>Your order is being prepared.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default OrderTrackingScreen;
