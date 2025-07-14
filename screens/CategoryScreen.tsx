// screens/CategoryScreen.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  onSelectCategory: (category: string) => void;
}

const CategoryScreen: React.FC<Props> = ({ onSelectCategory }) => {
  const categories = ["1984Words", "IELTS"];

  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <Pressable
          key={cat}
          style={styles.btn}
          onPress={() => onSelectCategory(cat)}
        >
          <Text style={styles.btnText}>{cat}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  btn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 2,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
