import CustomButton from "@/components/ui/CustomButton";
import ProgressBar from "@/components/ui/ProgressBar";
import SelectableList from "@/components/ui/SelectableList";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

// Определяем данные для списка
const languageOptions = [
  { emoji: "🇺🇸", text: "English" },
  { emoji: "🇪🇸", text: "Español" },
  { emoji: "🇧🇷", text: "Português" },
];

const LanguageScreen = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(0);

  const handleNext = () => {
    console.log(
      `Language selected: ${languageOptions[selectedLanguage!].text}`
    );
    router.push("/AskQuestionScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.9} onBackPress={router.back} />

      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Choose Your Bible Language</Text>
          <Text style={styles.subtitle}>
            This sets the language for all Scripture text.
          </Text>

          <SelectableList
            options={languageOptions}
            selectedOption={selectedLanguage}
            onSelect={setSelectedLanguage}
          />
        </View>

        <CustomButton title="Ask a Question" onPress={handleNext} />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#667085",
    textAlign: "center",
    marginBottom: 32,
  },
});

export default LanguageScreen;
