import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import CustomTitle from "@/components/ui/CustomTitle";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";

const TestimonialCard = ({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) => (
  <View style={styles.card}>
    <Text style={styles.quoteText}>"{quote}"</Text>
    <Text style={styles.authorText}>– {author}</Text>
  </View>
);

const JoinTransformedScreen = () => {
  const router = useRouter();

  const handleSeeOffer = () => {
    // Переход на самый последний экран
    // router.push('/FinalOfferScreen'); // Имя следующего экрана
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTitle>Join millions who transformed their faith</CustomTitle>

      <Container>
        <View>
          <TestimonialCard
            quote="This app brought me back to God. I feel hopeful again."
            author="Sarah M."
          />
          <TestimonialCard
            quote="Reading daily has changed everything for my peace of mind."
            author="David K."
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.statsContainer}>
            <Ionicons name="star" size={24} color="#FFC700" />
            <Text style={styles.statsText}>
              <Text style={styles.boldText}>4.8/5 Stars • 2.3M+ Downloads</Text>
            </Text>
          </View>
          <Text style={styles.subStatsText}>89% of members read daily</Text>

          <CustomButton title="See My Offer" onPress={handleSeeOffer} />
        </View>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F7",
  },
  // Card Styles
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#1D2939",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: { elevation: 5 },
    }),
  },
  quoteText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D2939",
    textAlign: "center",
    marginBottom: 12,
  },
  authorText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#667085",
    textAlign: "center",
  },
  // Footer Styles
  footer: {
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statsText: {
    fontSize: 16,
    color: "#1D2939",
    marginLeft: 8,
  },
  boldText: {
    fontWeight: "700",
  },
  subStatsText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#667085",
    marginBottom: 24,
  },
});

export default JoinTransformedScreen;
