import ProgressBar from "@/components/ui/ProgressBar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const DivineWisdomScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.15} onBackPress={router.back} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Feather name="sunrise" size={80} color="#98A2B3" />
        </View>

        <Text style={styles.title}>
          Your Daily Dose of Divine Wisdom Awaits
        </Text>

        <Text style={styles.subtitle}>
          Experience the joy of Scripture in just 5 minutes.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F7",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1D2939",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#667085",
    textAlign: "center",
    lineHeight: 28,
  },
});

export default DivineWisdomScreen;
