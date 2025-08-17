import { Ionicons } from "@expo/vector-icons"; // Используем иконку из Expo
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, SafeAreaView, StyleSheet } from "react-native";

const loadingTexts = [
  "Analyzing your profile...",
  "Finding perfect passages...",
  "Personalizing your experience...",
];

const PersonalizingScreen = () => {
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);
  const spinValue = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const intervalId = setInterval(() => {
      Animated.timing(textFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTextIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= loadingTexts.length) {
            clearInterval(intervalId);
            router.replace("/UnlockScreen");
            return prevIndex;
          }

          Animated.timing(textFadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();

          return nextIndex;
        });
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Ionicons name="sync-outline" size={60} color="#007AFF" />
      </Animated.View>

      <Animated.Text style={[styles.loadingText, { opacity: textFadeAnim }]}>
        {loadingTexts[textIndex]}
      </Animated.Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F7",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: "600",
    color: "#667085",
    textAlign: "center",
  },
});

export default PersonalizingScreen;
