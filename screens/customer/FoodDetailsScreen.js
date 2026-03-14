<<<<<<< HEAD
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { CartContext } from "../../context/CartContext";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function FoodDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...item, quantity });
    navigation.goBack();
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <ScrollView style={globalStyles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.ingredients}>
          {item.ingredients || "Fresh ingredients"}
        </Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityControls}>
            <Button
              mode="outlined"
              onPress={decreaseQuantity}
              style={styles.quantityButton}
              disabled={quantity <= 1}
            >
              <MaterialIcons name="remove" size={20} color={colors.primary} />
            </Button>
            <Text style={styles.quantity}>{quantity}</Text>
            <Button
              mode="outlined"
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <MaterialIcons name="add" size={20} color={colors.primary} />
            </Button>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleAddToCart}
          style={styles.addButton}
          buttonColor={colors.primary}
        >
          Add to Cart - ${(item.price * quantity).toFixed(2)}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    lineHeight: 24,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  ingredients: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 20,
  },
  quantityContainer: {
    marginBottom: 30,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButton: {
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    minWidth: 40,
    textAlign: "center",
  },
  addButton: {
    paddingVertical: 10,
    marginTop: 20,
  },
});
=======

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
>>>>>>> ad4022e44602687d7281cc64d15c232c9df781b1
