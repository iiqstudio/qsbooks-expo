import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const options = [
  { emoji: "🌱", text: "New to faith - just starting my spiritual journey" },
  { emoji: "😰", text: "Struggling with daily stress and anxiety" },
  { emoji: "🤔", text: "Reading Bible but confused by what it means" },
  { emoji: "😔", text: "Feeling alone in my spiritual struggles" },
  { emoji: "⏰", text: "Too busy for long Bible study sessions" },
  { emoji: "🤷‍♂️", text: "Have doubts but still searching for answers" },
  { emoji: "💔", text: "Going through a really hard time right now" },
  { emoji: "📅", text: "Want to build a consistent daily reading habit" },
];

export default function OnboardingScreen() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Who are you?</Text>
        <Text style={styles.subtitle}>Choose what describes you best.</Text>
      </View>
      <ScrollView
        style={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOption === index && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(index)}
          >
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text
              style={[
                styles.optionText,
                selectedOption === index && styles.selectedOptionText,
              ]}
            >
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't worry - you can explore all features once you start.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  selectedOption: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  emoji: {
    fontSize: 24,
    marginRight: 16,
  },
  optionText: {
    fontSize: 17,
    color: "#111827",
    flex: 1,
  },
  selectedOptionText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  footer: {
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
});
