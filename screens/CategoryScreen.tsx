// screens/CategoryScreen.tsx
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { useTheme } from "../ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";

const getWidth = () => {
  if (Platform.OS === "web") {
    return window.innerWidth;
  }
  return Dimensions.get("window").width;
};

interface Props {
  onSelectCategory: (category: string) => void;
}

const CategoryScreen: React.FC<Props> = ({ onSelectCategory }) => {
  const isDesktop = getWidth() > 768;
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme, isDesktop);
  const categories = [
    "1984Words",
    "IELTS",
    "Politics",
    "Economy",
    "Science",
    "IR",
    "Acronyms",
    "GRE",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.themeToggle}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </View>
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

const getStyles = (theme: "light" | "dark", isDesktop?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#121212" : "#f4f6f8",
      alignItems: "center",
      justifyContent: "center",
      gap: isDesktop ? 16 : 10,
    },

    themeToggle: {
      position: "absolute",
      top: 15,
      right: 10,
      paddingHorizontal: 16,
      paddingBottom: 200,
    },

    btn: {
      backgroundColor: theme === "dark" ? "#6495ed" : "#6495ed",
      paddingVertical: 16,
      paddingHorizontal: 52,
      width: isDesktop ? 400 : "80%",
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
