import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";

export default function ProfileScreen() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={globalStyles.container}>
      <Header
        title="Profile"
        subtitle="Stay ready for every guest moment"
        showBack
      />
      <View style={styles.content}>
        <View style={[styles.infoCard, globalStyles.shadow]}>
          <MaterialCommunityIcons
            name="account-circle"
            size={64}
            color={colors.primary}
          />
          <Text style={styles.name}>{user?.name || "Team Member"}</Text>
          <Text style={styles.role}>{user?.role || "Hospitality Professional"}</Text>
          <Text style={styles.meta}>{user?.email}</Text>
          <Text style={styles.meta}>{user?.desk}</Text>
          <Text style={styles.meta}>{user?.shift}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            mode="contained"
            buttonColor={colors.secondary}
            style={styles.button}
            onPress={signOut}
          >
            Sign Out
          </Button>
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => {}}
          >
            Edit Console Preferences
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  infoCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.card,
    marginBottom: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
    color: colors.text,
  },
  role: {
    fontSize: 16,
    color: colors.subtitle,
    marginBottom: 6,
  },
  meta: {
    fontSize: 14,
    color: colors.muted,
  },
  actions: {
    flexDirection: "column",
  },
  button: {
    borderRadius: 14,
    marginBottom: 12,
  },
});
