import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" />
      <Stack.Screen name="ValidationScreen" />
      <Stack.Screen name="RewardScreen" />
      <Stack.Screen name="PaywallScreen" />
      <Stack.Screen name="OnboardingPeace" />
    </Stack>
  );
}
