import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" />
      <Stack.Screen name="PaywallScreen" />
      <Stack.Screen name="OnboardingPeaceScreen" />
      <Stack.Screen name="QuoteScreen" />
      <Stack.Screen name="PeaceBeginningScreen" />
      <Stack.Screen name="LanguageScreen" />
      <Stack.Screen name="AskQuestionScreen" />
    </Stack>
  );
}
