import CustomButton from "@/components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";

const RecommendedPathItem = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.pathItem}>
    <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
    <Text style={styles.pathItemText}>{children}</Text>
  </View>
);

const SpiritualProfileScreen = () => {
  const router = useRouter();

  const handleUnlockPath = () => {
    router.push("/UnlockScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>YOUR SPIRITUAL PROFILE</Text>
          </View>

          <Text style={styles.title}>The Seeking Heart</Text>

          <Text style={styles.description}>
            Based on your responses, you deeply desire growth but struggle with
            consistency. You're not alone –{" "}
            <Text style={styles.boldText}>67% of believers</Text> face the same
            challenge.
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Recommended Path:</Text>
            <RecommendedPathItem>
              Start with{" "}
              <Text style={styles.boldText}>5-minute daily readings</Text>
            </RecommendedPathItem>
            <RecommendedPathItem>
              Focus on <Text style={styles.boldText}>Psalms and Proverbs</Text>
            </RecommendedPathItem>
            <RecommendedPathItem>
              Join discussions on{" "}
              <Text style={styles.boldText}>practical faith</Text>
            </RecommendedPathItem>
          </View>
        </View>

        <CustomButton title="Unlock My Path" onPress={handleUnlockPath} />
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
    paddingTop: 60, // Больше отступ сверху
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  pill: {
    backgroundColor: "#EBF5FF", // Светло-голубой фон
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100, // Полностью скругленные углы
    alignSelf: "center",
    marginBottom: 16,
  },
  pillText: {
    color: "#007AFF", // Синий текст
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#1D2939",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: "500",
    color: "#667085",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 32,
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
  pathItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  pathItemText: {
    fontSize: 16,
    color: "#475467",
    marginLeft: 12,
    flex: 1, // Чтобы текст правильно переносился
  },
  boldText: {
    fontWeight: "700",
    color: "#1D2939", // Более темный и жирный текст
  },
});

export default SpiritualProfileScreen;
