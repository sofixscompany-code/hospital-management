import { MaterialIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { getLoyaltyPoints } from "../../services/orderService";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function LoyaltyScreen() {
  const [loyaltyData, setLoyaltyData] = useState({ points: 0, rewards: [] });

  useEffect(() => {
    loadLoyaltyData();
  }, []);

  const loadLoyaltyData = async () => {
    try {
      const data = await getLoyaltyPoints();
      setLoyaltyData(data);
    } catch (error) {
      console.error("Error loading loyalty data:", error);
    }
  };

  const renderReward = ({ item }) => (
    <Card style={styles.rewardCard}>
      <Card.Content style={styles.rewardContent}>
        <View style={styles.rewardInfo}>
          <Text style={styles.rewardType}>{item.rewardType}</Text>
          <Text style={styles.rewardPoints}>+{item.points} points</Text>
        </View>
        <Text style={styles.rewardDate}>{item.timestamp}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Loyalty Rewards</Text>

      <Card style={styles.pointsCard}>
        <Card.Content style={styles.pointsContent}>
          <MaterialIcons name="stars" size={40} color={colors.primary} />
          <View style={styles.pointsInfo}>
            <Text style={styles.pointsNumber}>{loyaltyData.points}</Text>
            <Text style={styles.pointsLabel}>Total Points</Text>
          </View>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Reward History</Text>

      {loyaltyData.rewards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="history" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No rewards yet</Text>
          <Text style={styles.emptySubtext}>Leave reviews to earn points!</Text>
        </View>
      ) : (
        <FlatList
          data={loyaltyData.rewards}
          renderItem={renderReward}
          keyExtractor={(item) => item.id.toString()}
          style={styles.rewardsList}
        />
      )}

      <Text style={styles.info}>
        Earn points by leaving reviews after your orders are completed. Positive
        reviews: 10 points | Neutral: 3 points | Negative: 0 points
      </Text>
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
  pointsCard: {
    margin: 20,
    ...globalStyles.shadow,
  },
  pointsContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  pointsInfo: {
    marginLeft: 20,
    alignItems: "center",
  },
  pointsNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.primary,
  },
  pointsLabel: {
    fontSize: 16,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginBottom: 10,
    color: colors.text,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
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
  rewardsList: {
    paddingHorizontal: 20,
  },
  rewardCard: {
    marginBottom: 10,
    ...globalStyles.shadow,
  },
  rewardContent: {
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
  info: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    margin: 20,
    lineHeight: 20,
  },
});
