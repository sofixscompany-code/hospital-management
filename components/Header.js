import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";

export default function Header({ title, subtitle, showBack = false, action }) {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.header}>
      {showBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {action ? <View style={styles.action}>{action}</View> : null}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  textGroup: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  subtitle: {
    color: "#dfe7ff",
    fontSize: 12,
  },
  action: {
    marginRight: 8,
  },
});
