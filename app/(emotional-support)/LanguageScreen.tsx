import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import CustomTitle from "@/components/ui/CustomTitle";
import ProgressBar from "@/components/ui/ProgressBar";
import SelectableList from "@/components/ui/SelectableList";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

const languageOptions = [
  { emoji: "🇺🇸", text: "English" },
  { emoji: "🇪🇸", text: "Español" },
  { emoji: "🇧🇷", text: "Português" },
  { emoji: "🇷🇺", text: "Russian" },
];

const LanguageScreen = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(0);

  const handleNext = () => {
    console.log(
      `Language selected: ${languageOptions[selectedLanguage!].text}`
    );
    router.push("/SpiritualGrowthScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.6} onBackPress={router.back} />

      <Container>
        <View>
          <CustomTitle>Which language speaks to your heart?</CustomTitle>
          <SelectableList
            options={languageOptions}
            selectedOption={selectedLanguage}
            onSelect={setSelectedLanguage}
          />
        </View>

        <CustomButton title="Continue" onPress={handleNext} />
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F7",
  },
});

export default LanguageScreen;
