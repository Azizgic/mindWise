// components/Card.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from "react-native";

interface Props {
  isWord: boolean;
  id: string;
  displayText: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const Card: React.FC<Props> = ({ isWord, id, displayText, onPress }) => {
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 24,
    minHeight: 220,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 6,
    width: "100%",
  },
  cardPressed: {
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    transform: [{ translateY: -1 }, { scale: 1.005 }],
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#4c51b5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  typeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e0e7ff",
    textAlign: "center",
  },
  id: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255,255,255,0.7)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  displayText: {
    fontSize: 20,
    color: "#111827",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "500",
  },
});
