import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { CartContext } from "../../context/CartContext";
import { getMenu } from "../../services/menuService";
import { colors, globalStyles } from "../../styles/globalStyles";

const categories = ["All", "Starters", "Main Course", "Drinks", "Desserts"];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { tableNumber } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const items = await getMenu();
      setMenuItems(items);
      setPopularItems(items.slice(0, 4)); // Show first 4 as popular
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

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
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to Smart Hospitality</Text>
        {tableNumber && (
          <Text style={styles.tableInfo}>Table {tableNumber}</Text>
        )}
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("QRScanner")}
          style={styles.scanButton}
          icon="qrcode-scan"
        >
          Scan Table QR
        </Button>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />

      <Text style={styles.sectionTitle}>Popular Dishes</Text>
      <FlatList
        data={popularItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.menuList}
      />

      <Text style={styles.sectionTitle}>All Menu Items</Text>
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={styles.allMenuList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  tableInfo: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
  },
  scanButton: {
    borderColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginBottom: 10,
    color: colors.text,
  },
  categoriesList: {
    marginHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    ...globalStyles.shadow,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.text,
    fontWeight: "bold",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  menuList: {
    marginHorizontal: 20,
  },
  menuCard: {
    width: 200,
    marginRight: 15,
    ...globalStyles.shadow,
  },
  allMenuList: {
    marginHorizontal: 20,
    marginBottom: 20,
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
});
