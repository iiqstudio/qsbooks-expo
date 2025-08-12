import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="validation" />
      <Stack.Screen name="reward" />
      <Stack.Screen name="paywall" />
      <Stack.Screen name="testhome" />
    </Stack>
  );
}
