import { Stack } from "expo-router";

export default function EmotionalSupportLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PersonalPathScreen" />
      <Stack.Screen name="ScriptureMotivationScreen" />
      <Stack.Screen name="ReadingFrequencyScreen" />
      <Stack.Screen name="StudyChallengeScreen" />
      <Stack.Screen name="LanguageScreen" />
    </Stack>
  );
}
