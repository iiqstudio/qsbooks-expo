import { Stack } from "expo-router";

export default function FaithJourneyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingPeaceScreen" />
      <Stack.Screen name="QuoteScreen" />
      <Stack.Screen name="PeaceBeginningScreen" />
      <Stack.Screen name="LanguageScreen" />
      <Stack.Screen name="AskQuestionScreen" />
      <Stack.Screen name="PrayerScreen" />
      <Stack.Screen name="SummaryScreen" />
      <Stack.Screen name="UnlockScreen" />
    </Stack>
  );
}
