import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <Card style={[styles.card, globalStyles.shadow]}>
      <Card.Content style={styles.content}>
        <Card.Cover source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.quantityControls}>
            <Button
              mode="outlined"
              onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
              style={styles.quantityButton}
              disabled={item.quantity <= 1}
            >
              <MaterialIcons name="remove" size={16} color={colors.primary} />
            </Button>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Button
              mode="outlined"
              onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
              style={styles.quantityButton}
            >
              <MaterialIcons name="add" size={16} color={colors.primary} />
            </Button>
          </View>
        </View>
        <Button
          mode="text"
          onPress={() => onRemove(item.id)}
          style={styles.removeButton}
        >
          <MaterialIcons name="delete" size={20} color="red" />
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: colors.card,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  price: {
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
});
