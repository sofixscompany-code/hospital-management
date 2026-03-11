
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
