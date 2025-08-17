import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import CustomTitle from "@/components/ui/CustomTitle";
import ProgressBar from "@/components/ui/ProgressBar";
import SelectableList from "@/components/ui/SelectableList";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const frequencyOptions = [
  { emoji: "⚓️", text: "Daily – it's my anchor" },
  { emoji: "🗓️", text: "Weekly – when I find time" },
  { emoji: "🌱", text: "Occasionally – I want to do better" },
  { emoji: "🚀", text: "Rarely – but I want to start" },
];

const ReadingFrequencyScreen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleContinue = () => {
    router.push("/StudyChallengeScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.6} onBackPress={router.back} />
      <CustomTitle>How often do you read the Bible?</CustomTitle>

      <Container>
        <SelectableList
          options={frequencyOptions}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />
        <CustomButton
          title="Continue"
          onPress={handleContinue}
          disabled={selectedOption === null}
        />
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

export default ReadingFrequencyScreen;
