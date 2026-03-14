import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { CartContext } from "../../context/CartContext";
import { placeOrder } from "../../services/orderService";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { cart, tableNumber, clearCart, getTotalPrice } =
    useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!tableNumber) {
      Alert.alert("Error", "Please scan your table QR code first");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        tableNumber: parseInt(tableNumber),
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: getTotalPrice(),
      };

      const response = await placeOrder(orderData);
      clearCart();
      Alert.alert("Success", "Order placed successfully!", [
        { text: "OK", onPress: () => navigation.navigate("Orders") },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={styles.title}>Checkout</Text>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Order Summary</Text>
          <Text style={styles.tableInfo}>
            Table: {tableNumber || "Not scanned"}
          </Text>

          {cart.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemName}>
                {item.name} x{item.quantity}
              </Text>
              <Text style={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>
              ${getTotalPrice().toFixed(2)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handlePlaceOrder}
        loading={loading}
        style={styles.placeOrderButton}
        buttonColor={colors.primary}
        disabled={!tableNumber}
      >
        {tableNumber ? "Place Order" : "Scan Table QR First"}
      </Button>

      {!tableNumber && (
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("QRScanner")}
          style={styles.scanButton}
        >
          Scan Table QR Code
        </Button>
      )}
    </ScrollView>
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
  summaryCard: {
    margin: 20,
    ...globalStyles.shadow,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  tableInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  placeOrderButton: {
    marginHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  scanButton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
