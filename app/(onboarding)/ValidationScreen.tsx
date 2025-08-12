import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const emotionHeadings: { [key: string]: string } = {
  Anxious: "For moments of anxiety, there is a word of peace.",
  Grateful: "For moments of gratitude, there is a word of praise.",
  Overwhelmed: "For moments of being overwhelmed, there is a word of calm.",
  Hopeful: "For moments of hope, there is a word of encouragement.",
  Lost: "For moments of feeling lost, there is a word of guidance.",
  Default: "For this moment, there is a word for you.",
};

const ValidationScreen = () => {
  const router = useRouter();
  const { emotion } = useLocalSearchParams<{ emotion: string }>();

  const headingText =
    emotionHeadings[emotion || "Default"] || emotionHeadings.Default;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/RewardScreen");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.statusText}>Finding a word for you...</Text>

        <Text style={styles.heading}>{headingText}</Text>

        <Text style={styles.blurredText} blurRadius={5}>
          Home
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  statusText: {
    fontSize: 16,
    color: "#8A8A8E",
    marginBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212121",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 38,
  },
  blurredText: {
    fontSize: 16,
    color: "#D1D1D6",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default ValidationScreen;
