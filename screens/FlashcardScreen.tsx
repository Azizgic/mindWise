import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
} from "react-native";
import Card from "../components/Card";

// 👇 Static imports (this is the fix!)
import data1984 from "../assets/data/1984Words.json";
import dataIELTS from "../assets/data/IELTS.json";

interface WordItem {
  word: string;
  definition: string;
}

interface Props {
  category: string;
  onBack: () => void;
}

// 👇 Mapping category name to imported data
const dataMap: Record<string, WordItem[]> = {
  "1984Words": data1984,
  IELTS: dataIELTS,
};

const FlashcardScreen: React.FC<Props> = ({ category, onBack }) => {
  const [data, setData] = useState<WordItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isFront, setIsFront] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  //const [isWord, setIsWord] = useState<boolean>(true);
  useEffect(() => {
    const loadData = () => {
      const result = dataMap[category];
      if (result) {
        setData(result);
      }
      setLoading(false);
    };
    loadData();
  }, [category]);

  const handlePress = () => {
    if (!data.length) return;

    if (isFront) {
      setIsFront(false);
    } else {
      const next = (index + 1) % data.length;
      setIndex(next);
      setIsFront(true);
    }
  };

  const handleNext = () => {
    if (!data.length) return;

    const next = (index + 1) % data.length;
    setIndex(next);
    setIsFront(true);
  };

  const handlePrev = () => {
    if (!data.length) return;

    const prev = index - 1 < 0 ? data.length - 1 : index - 1;

    setIndex(prev);
    setIsFront(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.center}>
        <Text>No data found</Text>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.text}>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backBtn}>
        <Text style={styles.text}>← Back</Text>
      </Pressable>
      <Card
        isWord={isFront}
        id={`${index + 1}/${data.length}`}
        displayText={isFront ? data[index].word : data[index].definition}
        onPress={handlePress}
      />
      <View style={styles.navBtnsContainer}>
        <Pressable onPress={handlePrev} style={styles.navBtn}>
          <Text style={styles.text}>Prev</Text>
        </Pressable>

        <Pressable onPress={handleNext} style={styles.navBtn}>
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FlashcardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#4c51bf",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
  navBtnsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  navBtn: {
    backgroundColor: "#4c51bf",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 8,
  },
});
