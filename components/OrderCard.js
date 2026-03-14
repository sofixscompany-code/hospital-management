import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";

  const STATUS_COLORS = {
  Pending: "#f97316",
  Cooking: "#3b82f6",
  Ready: "#22c55e",
  Completed: "#10b981",
};

export default function OrderCard({ order }) {
  return (
    <Card style={[styles.card, globalStyles.shadow]}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={[styles.status, { color: STATUS_COLORS[order.status] || colors.muted }]}>
            {order.status}
          </Text>
        </View>

        <Text style={styles.tableInfo}>Table {order.tableNumber}</Text>
        <Text style={styles.timestamp}>{order.timestamp}</Text>

        <View style={styles.itemsList}>
          {order.items.map((item, index) => (
            <Text key={index} style={styles.itemText}>
              {item.quantity}x {item.name}
            </Text>
          ))}
        </View>

        <Text style={styles.total}>${order.total.toFixed(2)}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  tableInfo: {
    fontSize: 14,
    color: colors.subtitle,
  },
  timestamp: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 8,
  },
  itemsList: {
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: colors.text,
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "right",
    marginTop: 4,
  },
});
