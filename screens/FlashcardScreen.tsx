import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
} from "react-native";
import Card from "../components/Card";
import ThemeToggle from "../components/ThemeToggle";

// 👇 Static imports (this is the fix!)
import data1984 from "../assets/data/1984Words.json";
import dataIELTS from "../assets/data/IELTS.json";
import politics from "../assets/data/politics.json";
import economy from "../assets/data/economy.json";
import science from "../assets/data/science.json";
import IR from "../assets/data/IR.json";
import acronyms from "../assets/data/acronyms.json";
import gre_words from "../assets/data/gre_words.json";

import { useTheme } from "../ThemeProvider";

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
  Politics: politics,
  Economy: economy,
  Science: science,
  IR: IR,
  Acronyms: acronyms,
  GRE: gre_words,
};

const FlashcardScreen: React.FC<Props> = ({ category, onBack }) => {
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);

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
      <View style={styles.themeToggle}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </View>

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

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#121212" : "#f4f6f8",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme === "dark" ? "#121212" : "#f4f6f8",
    },
    backBtn: {
      position: "absolute",
      top: 40,
      left: 20,
      backgroundColor: theme === "dark" ? "#6495ed" : "#6495ed",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    text: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    navBtnsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 24,
    },
    navBtn: {
      backgroundColor: theme === "dark" ? "#6495ed" : "#6495ed",
      paddingHorizontal: 50,
      paddingVertical: 15,
      borderRadius: 8,
    },
    themeToggle: {
      position: "absolute",
      top: 30,
      right: 10,
      paddingHorizontal: 16,
    },
  });
