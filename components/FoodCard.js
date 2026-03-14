import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";
  
export default function FoodCard({ item, onSelect }) {
  return (
    <Card style={[styles.card, globalStyles.shadow]}>
      <Card.Cover source={{ uri: item.image }} style={styles.image} />
      <Card.Content>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Button
            mode="contained"
            buttonColor={colors.secondary}
            onPress={() => onSelect?.(item)}
            icon="plus"
          >
            Add
          </Button>
        </View>
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
  image: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
});
