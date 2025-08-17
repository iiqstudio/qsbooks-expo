import CustomTitle from "@/components/ui/CustomTitle";
import ProgressBar from "@/components/ui/ProgressBar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const PersonalPathScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/ScriptureMotivationScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.2} onBackPress={router.back} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="people-outline" size={80} color="#98A2B3" />
        </View>

        <CustomTitle>Find Your Personal Path to Scripture</CustomTitle>

        <Text style={styles.subtitle}>
          Join 2.3M+ believers discovering deeper meaning through personalized
          Bible study.
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
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#667085",
    textAlign: "center",
    lineHeight: 28,
  },
});

export default PersonalPathScreen;
