import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Profile</Text>

      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Image
            size={80}
            source={require("../../assets/images/icon.png")}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "User"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "user@example.com"}
            </Text>
            <Text style={styles.userRole}>{user?.role || "Customer"}</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.menuItems}>
        <Card
          style={styles.menuCard}
          onPress={() =>
            Alert.alert("Info", "Edit profile feature coming soon!")
          }
        >
          <Card.Content style={styles.menuContent}>
            <MaterialIcons name="edit" size={24} color={colors.primary} />
            <Text style={styles.menuText}>Edit Profile</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </Card.Content>
        </Card>

        <Card
          style={styles.menuCard}
          onPress={() => navigation.navigate("Loyalty")}
        >
          <Card.Content style={styles.menuContent}>
            <MaterialIcons name="stars" size={24} color={colors.primary} />
            <Text style={styles.menuText}>Loyalty Points</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </Card.Content>
        </Card>

        <Card
          style={styles.menuCard}
          onPress={() =>
            Alert.alert("Info", "Order history feature coming soon!")
          }
        >
          <Card.Content style={styles.menuContent}>
            <MaterialIcons name="history" size={24} color={colors.primary} />
            <Text style={styles.menuText}>Order History</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </Card.Content>
        </Card>

        <Card
          style={styles.menuCard}
          onPress={() => Alert.alert("Info", "Settings feature coming soon!")}
        >
          <Card.Content style={styles.menuContent}>
            <MaterialIcons name="settings" size={24} color={colors.primary} />
            <Text style={styles.menuText}>Settings</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </Card.Content>
        </Card>
      </View>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor="#dc3545"
      >
        Logout
      </Button>
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
  profileCard: {
    margin: 20,
    ...globalStyles.shadow,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginVertical: 2,
  },
  userRole: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "bold",
  },
  menuItems: {
    marginHorizontal: 20,
  },
  menuCard: {
    marginBottom: 10,
    ...globalStyles.shadow,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 15,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 10,
  },
});
