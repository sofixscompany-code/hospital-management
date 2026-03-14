import { useRef, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Animated, Pressable } from "react-native";
import Header from "../components/Header";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";
import LoyaltyCard from "../components/LoyaltyCard";

const rewards = [
  { id: "r1", rewardType: "room_upgrade", points: 420, timestamp: "March 14, 09:20" },
  { id: "r2", rewardType: "cocktail", points: 280, timestamp: "March 11, 17:40" },
  { id: "r3", rewardType: "spa_session", points: 520, timestamp: "March 07, 12:05" },
];

export default function LoyaltyScreen() {
  // Animated points counter
  const animatedPoints = useRef(new Animated.Value(0)).current;
  const totalPoints = 1240;

  useEffect(() => {
    Animated.timing(animatedPoints, {
      toValue: totalPoints,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedValue = animatedPoints.interpolate({
    inputRange: [0, totalPoints],
    outputRange: [0, totalPoints],
  });

  return (
    <View style={globalStyles.container}>
      <Header
        title="Loyalty Rewards"
        subtitle="Moments that keep guests returning"
        showBack
        light
      />

      {/* Hero Section */}
      <View style={styles.hero}>
        <Animated.Text style={styles.points}>
          {animatedPoints.interpolate({
            inputRange: [0, totalPoints],
            outputRange: ["0", totalPoints.toString()],
          }).__getValue()}
          {" "}pts
        </Animated.Text>
        <Text style={styles.description}>
          Tonight's cohort unlocks a mixology flight and a sunrise suite.
        </Text>
        {/* Progress Bar */}
        <View style={styles.progressBackground}>
          <Animated.View
            style={[
              styles.progressFill,
              { width: `${(animatedPoints.__getValue() / totalPoints) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Rewards List */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {rewards.map((reward) => (
          <Pressable
            key={reward.id}
            style={({ pressed }) => [
              styles.cardWrapper,
              pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
            ]}
          >
            <LoyaltyCard reward={reward} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    margin: 16,
    padding: 24,
    borderRadius: 18,
    backgroundColor: "rgba(79, 70, 229, 0.1)",
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  points: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    color: colors.subtitle,
    marginTop: 8,
  },
  progressBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 5,
    marginTop: 12,
  },
  progressFill: {
    height: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  cardWrapper: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});