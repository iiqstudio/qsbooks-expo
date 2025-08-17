import ProgressBar from "@/components/ui/ProgressBar";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TimerSvg from "../../assets/images/svg/timer.svg";

const OnboardingPeaceScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/QuoteScreen");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.25} onBackPress={() => navigation.goBack()} />

      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TimerSvg width={80} height={80} />
        </View>

        <Text style={styles.title}>
          Get Your Daily Dose of Peace in 30 Seconds
        </Text>

        <Text style={styles.subtitle}>
          Experience the power of Scripture immediately.
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
  },
});

export default OnboardingPeaceScreen;
