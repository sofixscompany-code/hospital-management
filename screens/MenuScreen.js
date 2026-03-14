import { Alert, FlatList, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import FoodCard from "../components/FoodCard";
import { globalStyles } from "../styles/globalStyles";

const menuItems = [
  {
    id: "1",
    name: "Celestial Degustation",
    description: "Seasonal amuse-bouches with miso caramel and yuzu pearls.",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Heritage Harbor Platter",
    description: "Local oysters, smoked trout, and citrus micro-herbs.",
    price: 38,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Evening Velvet Soup",
    description: "Charred leek bisque with truffle mist and sourdough croutons.",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Midnight Garden",
    description: "Smoked beetroot tartare, pistachio, lemon zest.",
    price: 34,
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=800&q=80",
  },
];

export default function MenuScreen() {
  const handleSelect = (item) => {
    Alert.alert("Menu curated", `${item.name} added to the guest note.`);
  };

  return (
    <View style={globalStyles.container}>
      <Header
        title="Menu"
        subtitle="Curated plates and experiences"
        showBack
      />
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard item={item} onSelect={handleSelect} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});
