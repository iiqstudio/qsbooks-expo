import CustomButton from "@/components/ui/CustomButton";
import CustomTitle from "@/components/ui/CustomTitle";
import ProgressBar from "@/components/ui/ProgressBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const PrayerScreen = () => {
  const router = useRouter();

  const handleFinishOnboarding = () => {
    router.replace("/SummaryScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.9} onBackPress={router.back} />

      <View style={styles.container}>
        <View>
          <CustomTitle>Turn Insight Into Prayer Instantly</CustomTitle>
          <View style={styles.chatContainer}>
            <Text style={styles.authorYou}>You</Text>
            <View style={styles.userBubble}>
              <Text style={styles.bubbleTextUser}>
                Turn this into a prayer for me
              </Text>
            </View>

            <View style={styles.authorAi}>
              <MaterialCommunityIcons
                name="robot-outline"
                size={20}
                color="#475467"
              />
              <Text style={styles.authorAiText}>AI Guide</Text>
            </View>
            <View style={styles.aiBubble}>
              <Text style={styles.bubbleTextAi}>
                Lord, thank you for your plan for my future filled with hope.
                When I feel anxious, remind me of your promise...
              </Text>
            </View>
          </View>
        </View>

        <CustomButton
          title="See Everything You Did"
          onPress={handleFinishOnboarding}
        />
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
  chatContainer: {
    paddingHorizontal: 8,
  },
  authorYou: {
    textAlign: "right",
    color: "#667085",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  userBubble: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    alignSelf: "flex-end",
    maxWidth: "85%",
    marginBottom: 24,
  },
  bubbleTextUser: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  authorAi: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  authorAiText: {
    color: "#475467",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  aiBubble: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    alignSelf: "flex-start",
    maxWidth: "85%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bubbleTextAi: {
    color: "#1D2939",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
});

export default PrayerScreen;
