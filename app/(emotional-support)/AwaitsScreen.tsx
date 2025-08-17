import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import CustomTitle from "@/components/ui/CustomTitle";
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

const AwaitsScreen = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container>
        <View>
          <CustomTitle>Here's what awaits you:</CustomTitle>

          <View style={styles.checklistContainer}>
            <ChecklistItem text="Offline reading anywhere" />
            <ChecklistItem text="AI passage discussions" />
            <ChecklistItem text="Multiple languages & fonts" />
            <ChecklistItem text="Daily personalized verses" />
            <ChecklistItem text="Community discussions" />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.infoText}>
            All this for less than $0.20 per day.
          </Text>
        </View>

        <CustomButton title="Continue" onPress={handleContinue} />
      </Container>
    </SafeAreaView>
  );
};

// --- Обновляем Стили ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F7",
  },
  // 3. Новый стиль для контейнера списка
  checklistContainer: {
    alignSelf: "center", // Это магия! Контейнер сожмется до ширины контента и встанет по центру
    marginTop: 20, // Добавим немного воздуха после заголовка
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
  footer: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#667085",
    marginBottom: 16,
  },
});

export default AwaitsScreen;
