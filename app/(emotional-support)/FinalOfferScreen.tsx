import CustomTitle from "@/components/ui/CustomTitle";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";

const FeatureItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <View style={styles.featureItem}>
    {icon}
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const FinalOfferScreen = () => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomTitle>Start Your Spiritual Transformation</CustomTitle>
        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>SPECIAL OFFER EXPIRES IN</Text>
          <Text style={styles.timerText}>{formattedTime}</Text>
        </View>

        <View style={styles.card}>
          <FeatureItem
            icon={
              <Ionicons name="checkmark-circle" size={24} color="#27AE60" />
            }
            text="7-Day FREE Trial"
          />
          <FeatureItem
            icon={
              <Ionicons name="checkmark-circle" size={24} color="#27AE60" />
            }
            text="Then only $5.99/month"
          />
          <FeatureItem
            icon={
              <Ionicons name="checkmark-circle" size={24} color="#27AE60" />
            }
            text="Cancel anytime, no commitments"
          />
          <FeatureItem
            icon={
              <MaterialCommunityIcons name="gift" size={24} color="#27AE60" />
            }
            text="BONUS: Devotional guide"
          />
        </View>

        <Text style={styles.footerText}>Your journey awaits.</Text>
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
    paddingHorizontal: 24,
  },
  timerContainer: {
    borderWidth: 2,
    borderColor: "#E53E3E", // Красная рамка
    backgroundColor: "#FFF5F5", // Светло-красный фон
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  timerLabel: {
    color: "#E53E3E",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 4,
  },
  timerText: {
    color: "#1D2939",
    fontWeight: "800",
    fontSize: 48,
  },
  card: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#1D2939",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: { elevation: 5 },
    }),
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  featureText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D2939",
    marginLeft: 16,
  },
  footerText: {
    position: "absolute",
    bottom: 40,
    fontSize: 14,
    fontWeight: "500",
    color: "#667085",
  },
});

export default FinalOfferScreen;
