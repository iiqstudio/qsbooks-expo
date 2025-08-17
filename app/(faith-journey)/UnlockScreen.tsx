import CustomButton from "@/components/ui/CustomButton";
import CustomTitle from "@/components/ui/CustomTitle";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

const UnlockScreen = () => {
  const router = useRouter();

  const handleStartTrial = () => {
    // router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <CustomTitle>Unlock Unlimited Daily Peace</CustomTitle>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Premium Access Includes:</Text>
            <FeatureItem
              icon={
                <MaterialCommunityIcons
                  name="robot-outline"
                  size={24}
                  color="#007AFF"
                />
              }
              text="Unlimited AI Scripture Guide"
            />
            <FeatureItem
              icon={
                <Ionicons
                  name="sync-circle-outline"
                  size={24}
                  color="#007AFF"
                />
              }
              text="Daily Personalized Verses"
            />
            <FeatureItem
              icon={<Feather name="wifi-off" size={22} color="#007AFF" />}
              text="Full Offline Access"
            />
            <FeatureItem
              icon={<Ionicons name="globe-outline" size={24} color="#007AFF" />}
              text="All Languages Unlocked"
            />
          </View>

          <Text style={styles.priceText}>Continue for just $5.99/month.</Text>
        </View>

        <View style={styles.footer}>
          <CustomButton
            title="Start 7-Day FREE Trial"
            onPress={handleStartTrial}
            variant="success"
          />
          <Text style={styles.footerText}>
            Don't lose the peace you just found.
          </Text>
        </View>
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
    paddingTop: 60,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D2939",
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  featureText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475467",
    marginLeft: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475467",
    textAlign: "center",
    marginTop: 24,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#667085",
    marginTop: 16,
  },
});

export default UnlockScreen;
