import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import OrderCard from "../components/OrderCard";
import { globalStyles } from "../styles/globalStyles";

const orders = [
  {
    id: 1024,
    status: "Cooking",
    tableNumber: "Terrace 2",
    timestamp: "11:42 AM",
    items: [
      { name: "Celestial Degustation", quantity: 1 },
      { name: "Heritage Harbor Platter", quantity: 1 },
    ],
    total: 135.5,
  },
  {
    id: 1031,
    status: "Ready",
    tableNumber: "Suite 12",
    timestamp: "10:58 AM",
    items: [
      { name: "Evening Velvet Soup", quantity: 2 },
      { name: "Midnight Garden", quantity: 1 },
    ],
    total: 98.25,
  },
  {
    id: 1042,
    status: "Pending",
    tableNumber: "Lobby Lounge",
    timestamp: "09:40 AM",
    items: [
      { name: "Heritage Harbor Platter", quantity: 2 },
      { name: "Midnight Garden", quantity: 2 },
    ],
    total: 142.8,
  },
];

export default function OrdersScreen() {
  return (
    <View style={globalStyles.container}>
      <Header title="Orders" subtitle="Live service timeline" showBack />
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 32,
  },
});
