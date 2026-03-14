<<<<<<< HEAD
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { getMenu } from "../../services/menuService";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function MenuScreen() {
  const navigation = useNavigation();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const items = await getMenu();
      setMenuItems(items);
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  };

  const renderMenuItem = ({ item }) => (
    <Card
      style={styles.menuCard}
      onPress={() => navigation.navigate("FoodDetails", { item })}
    >
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Our Menu</Text>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.menuList}
      />
    </View>
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
  menuList: {
    padding: 10,
  },
  menuCard: {
    flex: 1,
    margin: 10,
    ...globalStyles.shadow,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  itemCategory: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
});
=======

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FoodCard from '../../components/FoodCard';
import { DUMMY_FOOD_ITEMS } from '../../data/dummy-data';

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={DUMMY_FOOD_ITEMS}
        renderItem={({ item }) => <FoodCard item={item} />}
        keyExtractor={(item) => item.id}
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
});

export default MenuScreen;
>>>>>>> ad4022e44602687d7281cc64d15c232c9df781b1
