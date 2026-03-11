
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <View style={styles.item}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Button title="Remove" onPress={() => removeFromCart(item.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
});

export default CartItem;
