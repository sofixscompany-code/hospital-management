import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";

export default function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategory,
      ]}
      onPress={() => onSelectCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    ...globalStyles.shadow,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.text,
    fontWeight: "bold",
  },
  selectedCategoryText: {
    color: "#fff",
  },
});
