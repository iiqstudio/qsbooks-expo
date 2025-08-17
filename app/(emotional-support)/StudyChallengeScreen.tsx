import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import CustomTitle from "@/components/ui/CustomTitle";
import SelectableList from "@/components/ui/SelectableList";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const challengeOptions = [
  { emoji: "⏰", text: "Finding time in my schedule" },
  { emoji: "🤔", text: "Understanding difficult parts" },
  { emoji: "🔄", text: "Staying consistent and motivated" },
  { emoji: "💬", text: "Connecting with others" },
];

const StudyChallengeScreen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleNext = () => {
    router.push("/LanguageScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTitle>What's your biggest study challenge?</CustomTitle>

      <Container>
        <SelectableList
          options={challengeOptions}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />

        <View style={styles.footer}>
          <Text style={styles.infoText}>
            Don't worry - you're not alone in this struggle.
          </Text>
        </View>

        <CustomButton
          title="Next"
          onPress={handleNext}
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

export default StudyChallengeScreen;
