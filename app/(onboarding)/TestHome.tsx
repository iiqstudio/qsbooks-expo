import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const TestHome = () => {
  const router = useRouter();

  const userName = "Sarah";
  const graceDays = 5;
  const emotionTags = ["Anxious", "Grateful", "Overwhelmed"];

  const handleSettingsPress = () => {
    console.log("Навигация на экран настроек...");
    // router.push('/settings');
  };

  const handleEmotionTagPress = (emotion: string) => {
    console.log(`Открытие модального окна для эмоции: ${emotion}`);
    // Здесь будет логика открытия модального окна
  };

  const handleMomentOfPeacePress = () => {
    console.log("Открытие модального окна со случайным стихом...");
    // Здесь будет логика открытия модального окна
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* --- Верхний блок: Приветствие и Настройки --- */}
        <View style={styles.header}>
          <Text style={styles.greetingText}>
            {getGreeting()}, {userName}
          </Text>
          <TouchableOpacity onPress={handleSettingsPress}>
            {/* Для иконки можно использовать библиотеку, но для простоты пока текст */}
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* --- Центральный блок: Эмоции --- */}
        <View style={styles.mainContent}>
          <Text style={styles.feelingPrompt}>How are you feeling today?</Text>
          <View style={styles.tagsContainer}>
            {emotionTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={styles.tag}
                onPress={() => handleEmotionTagPress(tag)}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={handleMomentOfPeacePress}>
            <Text style={styles.momentButtonText}>
              Give Me a Moment of Peace
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- Нижний блок: Дни благодати --- */}
        <View style={styles.graceContainer}>
          <Text style={styles.graceTitle}>Days of Grace</Text>
          <Text style={styles.graceSubtitle}>
            You've experienced {graceDays} days of grace.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
  },
  settingsIcon: {
    fontSize: 24,
  },
  mainContent: {
    alignItems: "center",
  },
  feelingPrompt: {
    fontSize: 18,
    color: "#333",
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 28,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 22,
    margin: 6,
  },
  tagText: {
    fontSize: 16,
    color: "#424242",
  },
  momentButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  graceContainer: {
    alignItems: "center",
    paddingBottom: 20, // Отступ от нижнего края
  },
  graceTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 4,
  },
  graceSubtitle: {
    fontSize: 14,
    color: "#616161",
  },
});

export default TestHome;
