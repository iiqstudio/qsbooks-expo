import CustomButton from "@/components/ui/CustomButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const ChecklistItem = ({ text }: { text: string }) => (
  <View style={styles.checklistItem}>
    <MaterialCommunityIcons name="check-circle" size={24} color="#27AE60" />
    <Text style={styles.checklistText}>{text}</Text>
  </View>
);

const SummaryScreen = () => {
  const router = useRouter();

  const handleFinish = () => {
    router.push("/UnlockScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.95} onBackPress={router.back} />

      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Look What You Just Did in 90 Seconds</Text>
          <Text style={styles.subtitle}>
            You've already used the most powerful features.
          </Text>

          <View style={styles.checklistContainer}>
            <ChecklistItem text="Felt instant daily peace" />
            <ChecklistItem text="Set your preferred language" />
            <ChecklistItem text="Got an instant AI answer" />
            <ChecklistItem text="Created a personalized prayer" />
          </View>
        </View>

        <CustomButton title="Keep This Experience" onPress={handleFinish} />
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
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1D2939",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#667085",
    textAlign: "center",
    marginBottom: 40,
  },
  checklistContainer: {
    paddingHorizontal: 16, // Небольшой отступ для самого списка
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checklistText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D2939",
    marginLeft: 16,
  },
});

export default SummaryScreen;
