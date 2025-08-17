import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import CustomTitle from "@/components/ui/CustomTitle";
import ProgressBar from "@/components/ui/ProgressBar";
import SelectableList from "@/components/ui/SelectableList";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const growthOptions = [
  { emoji: "🏆", text: "Reading the entire Bible" },
  { emoji: "💡", text: "Understanding God's word better" },
  { emoji: "🕊️", text: "Finding peace and comfort daily" },
  { emoji: "🤗", text: "Growing closer to my community" },
];

const SpiritualGrowthScreen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleFinishProfile = () => {
    // Финальный шаг этого флоу, переходим на экран с предложением
    router.push("/UnlockScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.8} onBackPress={router.back} />
      <CustomTitle>What does spiritual growth look like?</CustomTitle>

      <Container>
        <SelectableList
          options={growthOptions}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />
        <CustomButton
          title="Finish Profile"
          onPress={handleFinishProfile}
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

export default SpiritualGrowthScreen;
