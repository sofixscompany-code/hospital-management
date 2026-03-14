import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { getOrders } from "../../services/orderService";
import { colors, globalStyles } from "../../styles/globalStyles";

const orderStatuses = ["Pending", "Cooking", "Ready", "Completed"];

export default function OrderTrackingScreen() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
    // Set up polling for real-time updates
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ffa726";
      case "Cooking":
        return "#42a5f5";
      case "Ready":
        return "#66bb6a";
      case "Completed":
        return "#26a69a";
      default:
        return "#999";
    }
  };

  const renderOrder = ({ item }) => (
    <Card style={styles.orderCard}>
      <Card.Content>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>

        <Text style={styles.tableInfo}>Table {item.tableNumber}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>

        <View style={styles.itemsList}>
          {item.items.map((orderItem, index) => (
            <Text key={index} style={styles.itemText}>
              {orderItem.quantity}x {orderItem.name}
            </Text>
          ))}
        </View>

        <Text style={styles.total}>Total: ${item.total}</Text>

        {item.status === "Ready" && (
          <Button
            mode="contained"
            style={styles.feedbackButton}
            buttonColor={colors.primary}
            onPress={() =>
              navigation.navigate("Feedback", { orderId: item.id })
            }
          >
            Leave Feedback
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  if (orders.length === 0) {
    return (
      <View style={[globalStyles.container, styles.emptyContainer]}>
        <MaterialIcons name="receipt" size={80} color="#ccc" />
        <Text style={styles.emptyText}>No orders yet</Text>
        <Text style={styles.emptySubtext}>
          Your order history will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Order Tracking</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id.toString()}
        style={styles.ordersList}
        refreshing={false}
        onRefresh={loadOrders}
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
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginVertical: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
  ordersList: {
    paddingHorizontal: 20,
  },
  orderCard: {
    marginBottom: 15,
    ...globalStyles.shadow,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  tableInfo: {
    fontSize: 14,
    color: "#666",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  itemsList: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "right",
    marginBottom: 10,
  },
  feedbackButton: {
    marginTop: 10,
  },
});
