<<<<<<< HEAD
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { CartContext } from "../../context/CartContext";
import { placeOrder } from "../../services/orderService";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { cart, tableNumber, clearCart, getTotalPrice } =
    useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!tableNumber) {
      Alert.alert("Error", "Please scan your table QR code first");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        tableNumber: parseInt(tableNumber),
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: getTotalPrice(),
      };

      const response = await placeOrder(orderData);
      clearCart();
      Alert.alert("Success", "Order placed successfully!", [
        { text: "OK", onPress: () => navigation.navigate("Orders") },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={styles.title}>Checkout</Text>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Order Summary</Text>
          <Text style={styles.tableInfo}>
            Table: {tableNumber || "Not scanned"}
          </Text>

          {cart.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemName}>
                {item.name} x{item.quantity}
              </Text>
              <Text style={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>
              ${getTotalPrice().toFixed(2)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handlePlaceOrder}
        loading={loading}
        style={styles.placeOrderButton}
        buttonColor={colors.primary}
        disabled={!tableNumber}
      >
        {tableNumber ? "Place Order" : "Scan Table QR First"}
      </Button>

      {!tableNumber && (
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("QRScanner")}
          style={styles.scanButton}
        >
          Scan Table QR Code
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: colors.text,
  },
  summaryCard: {
    margin: 20,
    ...globalStyles.shadow,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  tableInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  placeOrderButton: {
    marginHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  scanButton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
=======

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { useCart } from '../../context/CartContext';

const CheckoutScreen = ({ navigation }) => {
  const { total } = useCart();
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleConfirmOrder = () => {
    if (!name || !cardNumber || !expiry || !cvv) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Simulate payment processing
    Alert.alert('Payment Successful', 'Your order has been placed!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('OrderTracking'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <TextInput
        style={styles.input}
        placeholder="Name on Card"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiry}
        onChangeText={setExpiry}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
        secureTextEntry
      />
      <Text style={styles.summary}>Table Number: 12</Text>
      <Text style={styles.summary}>Total: ${total.toFixed(2)}</Text>
      <Button
        title="Confirm Order"
        onPress={handleConfirmOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  summary: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default CheckoutScreen;
>>>>>>> ad4022e44602687d7281cc64d15c232c9df781b1
