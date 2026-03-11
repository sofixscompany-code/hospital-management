
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
