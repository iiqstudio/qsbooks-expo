import CustomButton from "@/components/ui/CustomButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
const QuoteScreen = () => {
  const router = useRouter();
  const handleNext = () => {
    router.push("/PeaceBeginningScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar progress={0.3} onBackPress={() => router.back()} />

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>
              "'For I know the plans I have for you,' declares the Lord, 'plans
              to prosper you and not to harm you, to give you hope and a
              future.'"
            </Text>
            <Text style={styles.quoteSource}>- Jeremiah 29:11</Text>
          </View>

          <Text style={styles.descriptionText}>
            A divine promise that you have a hopeful future, no matter what
            you're facing today.
          </Text>
        </View>

        <CustomButton title="Feel The Impact" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F7", // Тот же кремовый фон
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: "space-between", // Равномерно распределяет контент
  },
  content: {
    flex: 1,
    justifyContent: "center", // Центрируем карточку и текст по вертикали
    alignItems: "center",
  },
  quoteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24, // Более скругленные углы
    padding: 32,
    width: "100%",
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: "#1D2939",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  quoteText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#1D2939",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 24,
  },
  quoteSource: {
    fontSize: 18,
    fontWeight: "600",
    color: "#475467",
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#667085",
    textAlign: "center",
    lineHeight: 28,
    paddingHorizontal: 16,
  },
});

export default QuoteScreen;
