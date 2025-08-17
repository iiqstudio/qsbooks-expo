import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import CustomTitle from "@/components/ui/CustomTitle";
import ProgressBar from "@/components/ui/ProgressBar";
import SelectableList from "@/components/ui/SelectableList";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const motivationOptions = [
  { emoji: "📖", text: "Daily wisdom and guidance" },
  { emoji: "💪", text: "Strength during hard times" },
  { emoji: "🤝", text: "Community and fellowship" },
  { emoji: "🙏", text: "Deeper relationship with God" },
];

const ScriptureMotivationScreen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleContinue = () => {
    console.log(`Selected option index: ${selectedOption}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.4} onBackPress={router.back} />

      <Container>
        <View>
          <CustomTitle>What draws you to Scripture most?</CustomTitle>

          <SelectableList
            options={motivationOptions}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.infoText}>
            2.1M users have found their answer...
          </Text>
        </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  footer: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#667085",
    marginBottom: 16,
  },
});

export default ScriptureMotivationScreen;
