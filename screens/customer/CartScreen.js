
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';

const CartScreen = ({ navigation }) => {
  const { cart, total } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.summary}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
      </View>
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
  summary: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default CartScreen;
