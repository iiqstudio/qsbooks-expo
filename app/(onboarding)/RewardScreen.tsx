import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const verseData = {
  quote:
    '"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."',
  reference: "- Philippians 4:6",
};

const RewardScreen = () => {
  const router = useRouter();
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleInteractionPress = () => {
    if (!isButtonActive) {
      setIsButtonActive(true);
    }
  };

  const handleContinuePress = () => {
    console.log("Переход на экран Paywall...");
    router.push("/PaywallScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.subheading}>Your verse for this moment:</Text>
        <View style={styles.verseBox}>
          <Text style={styles.verseText}>{verseData.quote}</Text>
          <Text style={styles.verseReference}>{verseData.reference}</Text>
        </View>

        <TouchableOpacity
          style={styles.interactionContainer}
          onPress={handleInteractionPress}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.interactionText,
              isButtonActive && styles.interactionTextActive,
            ]}
          >
            ✓ Feeling understood?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonActive]}
          onPress={handleContinuePress}
          disabled={false}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  subheading: {
    fontSize: 16,
    color: "#616161",
    marginBottom: 20,
    textAlign: "center",
  },
  verseBox: {
    marginBottom: 30,
    alignItems: "center",
  },
  verseText: {
    fontSize: 18,
    color: "#212121",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 16,
  },
  verseReference: {
    fontSize: 16,
    color: "#616161",
    fontStyle: "italic",
  },
  interactionContainer: {
    padding: 10,
  },
  interactionText: {
    fontSize: 15,
    color: "#A0A0A0",
  },
  interactionTextActive: {
    color: "#007AFF",
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    width: "100%",
  },
  button: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  buttonActive: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default RewardScreen;
