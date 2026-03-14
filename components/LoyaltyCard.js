import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";

export default function LoyaltyCard({ reward }) {
  return (
    <Card style={[styles.card, globalStyles.shadow]}>
      <Card.Content style={styles.content}>
        <View style={styles.rewardInfo}>
          <Text style={styles.rewardType}>
            {reward.rewardType.replace("_", " ")}
          </Text>
          <Text style={styles.rewardPoints}>+{reward.points} points</Text>
        </View>
        <Text style={styles.rewardDate}>{reward.timestamp}</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardInfo: {
    flex: 1,
  },
  rewardType: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    textTransform: "capitalize",
  },
  rewardPoints: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "bold",
  },
  rewardDate: {
    fontSize: 12,
    color: "#999",
  },
});
