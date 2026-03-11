
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useCart } from '../../context/CartContext';

const FoodDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const { addToCart } = useCart();

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 16,
  },
});

export default FoodDetailsScreen;
