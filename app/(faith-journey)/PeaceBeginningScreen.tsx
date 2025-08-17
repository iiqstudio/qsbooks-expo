import CustomButton from "@/components/ui/CustomButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const PeaceBeginningScreen = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/LanguageScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.45} onBackPress={() => router.back()} />

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.emoji}>❤️</Text>
          <Text style={styles.title}>
            Feel That Peace?{"\n"}That's Just the Beginning.
          </Text>
          <Text style={styles.subtitle}>
            You just experienced what 2.3M people feel every single day.
          </Text>
        </View>

        <CustomButton title="I Want This Daily Peace" onPress={handleNext} />
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 80,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
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
    paddingHorizontal: 16,
  },
});

export default PeaceBeginningScreen;
