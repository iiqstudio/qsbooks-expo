import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Plan = "annual" | "monthly";

const PaywallScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("annual");

  const userName = "Eli";

  const navigateToTestHome = () => {
    router.replace("/TestHome");
  };

  const handleStartTrial = () => {
    navigateToTestHome();
  };

  const handleMaybeLater = () => {
    navigateToTestHome();
  };

  const PlanOption = ({
    planId,
    title,
    price,
    billingInfo,
    isPopular = false,
  }: {
    planId: Plan;
    title: string;
    price: string;
    billingInfo: string;
    isPopular?: boolean;
  }) => {
    const isSelected = selectedPlan === planId;
    return (
      <TouchableOpacity
        style={[styles.planBox, isSelected && styles.planBoxSelected]}
        onPress={() => setSelectedPlan(planId)}
        activeOpacity={0.8}
      >
        {isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
          </View>
        )}
        <Text style={styles.planTitle}>{title}</Text>
        <Text style={styles.planPrice}>{price}</Text>
        <Text style={styles.planBilling}>{billingInfo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Unlock your guide, {userName}.</Text>
        <Text style={styles.subheading}>
          Get daily emotional check-ins, guided reflections from Eli, and
          unlimited offline reading.
        </Text>

        <PlanOption
          planId="annual"
          title="Annual"
          price="$4.99 / month"
          billingInfo="Billed at $59.99 yearly. Save 50%."
          isPopular={true}
        />

        <PlanOption
          planId="monthly"
          title="Monthly"
          price="$9.99 / month"
          billingInfo="Cancel anytime."
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleStartTrial}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            Start My 7-Day Free Trial
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleMaybeLater}
        >
          <Text style={styles.secondaryButtonText}>Maybe Later</Text>
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#212121",
    textAlign: "center",
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    color: "#616161",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  planBox: {
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  planBoxSelected: {
    borderColor: "#007AFF",
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  popularBadgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
  },
  planPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#212121",
    marginVertical: 4,
  },
  planBilling: {
    fontSize: 14,
    color: "#616161",
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    padding: 10,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: "#007AFF",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default PaywallScreen;
