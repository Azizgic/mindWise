import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";
  const animation = useSharedValue(isDark ? 1 : 0);

  const styles = getStyles(theme);

  useEffect(() => {
    animation.value = withTiming(isDark ? 1 : 0, { duration: 300 });
  }, [isDark]);

  const toggleAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animation.value * 30 }],
  }));

  return (
    <Pressable onPress={toggleTheme} style={styles.container}>
      <View style={styles.iconWrapper}>
        <FontAwesome5 name="sun" size={16} color="#facc15" />
        <FontAwesome5 name="moon" size={16} color="#64748b" />
        <Animated.View style={[styles.thumb, toggleAnimStyle]} />
      </View>
    </Pressable>
  );
};

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      padding: 10,
    },
    iconWrapper: {
      width: 60,
      height: 30,
      backgroundColor: theme === "dark" ? "#e5e7eb" : "#2a2a3c",
      borderRadius: 30,
      paddingHorizontal: 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
    },
    thumb: {
      position: "absolute",
      top: 3,
      left: 3,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: "#ffffff",
      zIndex: 1,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 1.5,
    },
  });

export default ThemeToggle;
