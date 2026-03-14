import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { CartContext } from "../../context/CartContext";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function CartScreen() {
  const navigation = useNavigation();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } =
    useContext(CartContext);

  const renderCartItem = ({ item }) => (
    <Card style={styles.cartItem}>
      <Card.Content style={styles.cartItemContent}>
        <Card.Cover source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <View style={styles.quantityControls}>
            <Button
              mode="outlined"
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              style={styles.quantityButton}
              disabled={item.quantity <= 1}
            >
              <MaterialIcons name="remove" size={16} color={colors.primary} />
            </Button>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Button
              mode="outlined"
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              style={styles.quantityButton}
            >
              <MaterialIcons name="add" size={16} color={colors.primary} />
            </Button>
          </View>
        </View>
        <Button
          mode="text"
          onPress={() => removeFromCart(item.id)}
          style={styles.removeButton}
        >
          <MaterialIcons name="delete" size={20} color="red" />
        </Button>
      </Card.Content>
    </Card>
  );

  if (cart.length === 0) {
    return (
      <View style={[globalStyles.container, styles.emptyCart]}>
        <MaterialIcons name="shopping-cart" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Menu")}
          buttonColor={colors.primary}
        >
          Browse Menu
        </Button>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cartList}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${getTotalPrice().toFixed(2)}</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Checkout")}
          style={styles.checkoutButton}
          buttonColor={colors.primary}
        >
          Proceed to Checkout
        </Button>
      </View>
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
  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginVertical: 20,
  },
  cartList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    marginBottom: 15,
    ...globalStyles.shadow,
  },
  cartItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.primary,
    marginVertical: 5,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    minWidth: 30,
    textAlign: "center",
  },
  removeButton: {
    alignSelf: "flex-start",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: colors.card,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: colors.text,
  },
  checkoutButton: {
    paddingVertical: 10,
  },
});
