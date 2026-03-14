import { useEffect, useRef, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Animated,
  Modal,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";
import { AuthContext } from "../context/AuthContext";

const { width } = Dimensions.get("window");

// Banner images
const banners = [
  { id: "b1", image: require("../assets/images/banner1.jpg") },
  { id: "b2", image: require("../assets/images/banner2.jpg") },
  { id: "b3", image: require("../assets/images/banner3.jpg") },
];

// Categories
const categories = ["Pizza", "Burger", "Pasta", "Sushi", "Desserts"];

// Metric Card Component
function MetricCard({ metric }) {
  const scale = useRef(new Animated.Value(0)).current;
  const [count, setCount] = useState(0);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();

    let interval = setInterval(() => {
      setCount((prev) => (prev < parseInt(metric.value) ? prev + 1 : prev));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View
      style={[
        styles.metricCard,
        { backgroundColor: metric.background, transform: [{ scale }] },
      ]}
    >
      <MaterialCommunityIcons
        name={metric.icon}
        size={28}
        color={metric.iconColor}
      />
      <Text style={styles.metricValue}>{count}</Text>
      <Text style={styles.metricTitle}>{metric.title}</Text>
      <Text style={styles.metricDescriptor}>{metric.descriptor}</Text>
    </Animated.View>
  );
}

// Main Dashboard
export default function DashboardScreen() {
  const { user } = useContext(AuthContext);

  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [foodPrice, setFoodPrice] = useState("");

  const metricsData = [
    {
      title: "Active Suites",
      value: "42",
      descriptor: "+6 check-ins",
      icon: "bed-empty",
      background: "#eef2ff",
      iconColor: "#6366f1",
    },
    {
      title: "Orders In Flight",
      value: "18",
      descriptor: "4 delivered today",
      icon: "food-fork-drink",
      background: "#ecfccb",
      iconColor: "#65a30d",
    },
    {
      title: "Pending Reservations",
      value: "8",
      descriptor: "2 today",
      icon: "calendar-clock",
      background: "#ffedd5",
      iconColor: "#f97316",
    },
  ];

  const quickActions = [
    { title: "Menu", subtitle: "Curated experiences", icon: "silverware-fork-knife" },
    { title: "Orders", subtitle: "Track tastings & service", icon: "timer-sand" },
    { title: "Loyalty", subtitle: "Rewards & recognition", icon: "sparkles" },
    { title: "Profile", subtitle: "Team concierge", icon: "account-circle" },
    { title: "Scan QR", subtitle: "Table identification", icon: "qrcode-scan" },
  ];

  const addFoodItem = () => {
    if (!foodName || !foodCategory || !foodPrice) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    setMenuItems([
      { id: Date.now().toString(), name: foodName, category: foodCategory, price: foodPrice },
      ...menuItems,
    ]);
    setFoodName("");
    setFoodCategory("");
    setFoodPrice("");
    setFoodModalVisible(false);
    Alert.alert("Success", "Food added!");
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header title="Dashboard" subtitle="Every guest touchpoint in one calm view" light />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#666" />
          <Text style={styles.searchText}>Search for meals or restaurants</Text>
        </View>

        {/* Banner Slider */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
          {banners.map((b) => (
            <Image key={b.id} source={b.image} style={styles.bannerImage} />
          ))}
        </ScrollView>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((cat) => (
            <Pressable
              key={cat}
              style={({ pressed }) => [
                styles.categoryCard,
                pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
              ]}
            >
              <Text style={styles.categoryText}>{cat}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Hero Card */}
        <LinearGradient colors={["#5a67d8", "#7f53ac"]} style={[globalStyles.card, styles.heroCard]}>
          <Text style={styles.heroTitle}>Hello, {user?.name || "Demo User"} 👋</Text>
          <Text style={styles.heroSubtitle}>
            The team is ready, and the floor is calm. Tap below to jump anywhere.
          </Text>
        </LinearGradient>

        {/* Metrics */}
        <Text style={[globalStyles.sectionTitle, { color: "#fff", marginTop: 20 }]}>Live Metrics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsRow}>
          {metricsData.map((metric) => (
            <MetricCard key={metric.title} metric={metric} />
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <Text style={[globalStyles.sectionTitle, { color: "#fff", marginTop: 20 }]}>Quick Access</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => {
            const scale = useRef(new Animated.Value(1)).current;
            return (
              <Pressable
                key={action.title}
                onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()}
                onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
              >
                <Animated.View style={[styles.actionCard, { transform: [{ scale }] }]}>
                  <View style={[styles.actionIcon, { backgroundColor: `${colors.primary}20` }]}>
                    <MaterialCommunityIcons name={action.icon} size={24} color={colors.primary} />
                  </View>
                  <View style={styles.actionText}>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color="#a1a5b6" />
                </Animated.View>
              </Pressable>
            );
          })}
        </View>

        {/* Meals Section */}
        {menuItems.length > 0 && (
          <>
            <Text style={[globalStyles.sectionTitle, { color: "#fff", marginTop: 20 }]}>Menu Items</Text>
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.mealsList}
              renderItem={({ item }) => (
                <Animated.View style={[styles.menuCard]}>
                  <Text style={styles.menuTitle}>{item.name}</Text>
                  <Text style={styles.menuSubtitle}>{item.category}</Text>
                  <Text style={styles.menuPrice}>${item.price}</Text>
                </Animated.View>
              )}
            />
          </>
        )}
      </ScrollView>

      {/* Floating Add Food Button */}
      <Pressable style={styles.floatingButton} onPress={() => setFoodModalVisible(true)}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </Pressable>

      {/* Add Food Modal */}
      <Modal visible={foodModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Food Item</Text>
            <TextInput placeholder="Name" value={foodName} onChangeText={setFoodName} style={styles.input} />
            <TextInput placeholder="Category" value={foodCategory} onChangeText={setFoodCategory} style={styles.input} />
            <TextInput placeholder="Price" value={foodPrice} onChangeText={setFoodPrice} style={styles.input} keyboardType="numeric" />
            <View style={styles.modalButtonRow}>
              <Pressable onPress={() => setFoodModalVisible(false)} style={[styles.modalButton, { backgroundColor: "#ccc" }]}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable onPress={addFoodItem} style={[styles.modalButton, { backgroundColor: colors.primary }]}>
                <Text style={{ color: "#fff" }}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 32 },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 10,
    elevation: 4,
  },
  searchText: { color: "#666", marginLeft: 10, fontSize: 16 },

  bannerContainer: { marginBottom: 16 },
  bannerImage: { width: width - 32, height: 150, borderRadius: 16, marginHorizontal: 16 },

  categoriesContainer: { flexDirection: "row", paddingLeft: 16, marginBottom: 16 },
  categoryCard: { backgroundColor: "#fff", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 20, marginRight: 12 },
  categoryText: { fontSize: 14, fontWeight: "600", color: colors.text },

  heroCard: { borderRadius: 20, padding: 20, marginHorizontal: 16, elevation: 6 },
  heroTitle: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  heroSubtitle: { fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 20 },

  metricsRow: { marginTop: 12, paddingLeft: 16 },
  metricCard: { width: 180, borderRadius: 16, padding: 16, marginRight: 12, justifyContent: "center", alignItems: "flex-start", elevation: 4 },
  metricValue: { fontSize: 26, fontWeight: "700", marginTop: 8, color: colors.subtitle },
  metricTitle: { fontSize: 14, fontWeight: "600", marginTop: 4, color: colors.text },
  metricDescriptor: { fontSize: 12, color: colors.muted },

  actionsGrid: { marginTop: 12, paddingHorizontal: 16 },
  actionCard: { flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 18, backgroundColor: colors.card, marginBottom: 12 },
  actionIcon: { width: 50, height: 50, borderRadius: 14, alignItems: "center", justifyContent: "center", marginRight: 14 },
  actionText: { flex: 1 },
  actionTitle: { fontSize: 16, fontWeight: "600", color: colors.text },
  actionSubtitle: { fontSize: 13, color: colors.muted },

  mealsList: { paddingLeft: 16, marginTop: 12 },
  menuCard: { backgroundColor: "#fff", padding: 14, borderRadius: 14, marginRight: 12, elevation: 4 },
  menuTitle: { fontSize: 16, fontWeight: "700" },
  menuSubtitle: { fontSize: 13, color: colors.muted },
  menuPrice: { fontSize: 14, fontWeight: "600", marginTop: 4, color: colors.primary },

  floatingButton: { position: "absolute", bottom: 30, right: 20, backgroundColor: colors.primary, width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", elevation: 6 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalCard: { width: "85%", backgroundColor: "#fff", borderRadius: 18, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 10 },
  modalButtonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  modalButton: { flex: 1, padding: 12, borderRadius: 10, alignItems: "center", justifyContent: "center", marginHorizontal: 4 },
});