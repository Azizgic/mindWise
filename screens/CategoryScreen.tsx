// screens/CategoryScreen.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../ThemeProvider";

interface Props {
  onSelectCategory: (category: string) => void;
}

const CategoryScreen: React.FC<Props> = ({ onSelectCategory }) => {
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);
  const categories = ["1984Words", "IELTS"];

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleTheme} style={styles.themeToggle}>
        <Text style={styles.btnText}>
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </Text>
      </Pressable>

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

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#121212" : "#f4f6f8",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    },

    themeToggle: {
      position: "absolute",
      top: 40,
      right: 20,
      backgroundColor: theme === "dark" ? "#2a2a3c" : "#4c51b5",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },

    btn: {
      backgroundColor: theme === "dark" ? "#2a2a3c" : "#4c51b5",
      paddingVertical: 16,
      paddingHorizontal: 52,
      width: "80%",
      borderRadius: 10,
      elevation: 2,
      alignItems: "center",
    },
    btnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
