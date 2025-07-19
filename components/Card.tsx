// components/Card.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../ThemeProvider";

interface Props {
  isWord: boolean;
  id: string;
  displayText: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const Card: React.FC<Props> = ({ isWord, id, displayText, onPress }) => {
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.header}>
        <Text style={styles.typeText}>{isWord ? "word" : "definition"}</Text>
        <Text style={styles.id}>{id}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.displayText}>
          {displayText || "No content available."}
        </Text>
      </View>
    </Pressable>
  );
};

export default Card;

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    card: {
      backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
      borderRadius: 12,
      paddingVertical: 24,
      paddingHorizontal: 24,
      minHeight: 220,
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOpacity: theme === "dark" ? 0.25 : 0.1,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 20,
      elevation: 6,
      width: "100%",
    },
    cardPressed: {
      shadowOpacity: theme === "dark" ? 0.35 : 0.12,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 18,
      transform: [{ translateY: -1 }, { scale: 1.005 }],
      backgroundColor: theme === "dark" ? "#2a2a2a" : "#eee",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme === "dark" ? "#2a2a3c" : "#4c51b5",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 20,
    },
    typeText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#ffffff",
      textAlign: "center",
    },
    id: {
      fontSize: 12,
      fontWeight: "500",
      color: theme === "dark" ? "#f8fafc" : "#eeeeee",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 6,
    },
    displayText: {
      fontSize: 20,
      color: theme === "dark" ? "#f8fafc" : "#0f172a",
      textAlign: "center",
      lineHeight: 28,
      fontWeight: "500",
    },
  });
