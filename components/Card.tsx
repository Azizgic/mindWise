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
      <View style={styles.cardData}>
        <View style={styles.data}>
          <Text style={styles.word}>{isWord ? "word" : "definition"}</Text>
          <Text style={styles.id}>{id}</Text>
        </View>
        <Text style={styles.display}>{displayText}</Text>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 32,
    paddingHorizontal: 24,
    minHeight: 240,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
    width: "100%",
  },
  cardPressed: {
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    transform: [{ translateY: -0.5 }],
  },
  cardData: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  data: {
    width: "100%",
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  word: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  id: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -2 }],
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255,255,255,0.75)",
  },
  display: {
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
    paddingTop: 18,
    paddingHorizontal: 6,
  },
});
