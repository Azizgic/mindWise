// App.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CategoryScreen from "./screens/CategoryScreen";
import FlashcardScreen from "./screens/FlashcardScreen";
import { ThemeProvider } from "./ThemeProvider";

export default function App() {
  const [category, setCategory] = useState<string | null>(null);

  return (
    <ThemeProvider>
      <View style={styles.appContainer}>
        {category ? (
          <FlashcardScreen
            category={category}
            onBack={() => setCategory(null)}
          />
        ) : (
          <CategoryScreen onSelectCategory={(cat) => setCategory(cat)} />
        )}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
