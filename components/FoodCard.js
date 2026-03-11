
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useCart } from '../../context/CartContext';

const FoodCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default FoodCard;
