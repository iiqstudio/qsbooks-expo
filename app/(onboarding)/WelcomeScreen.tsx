import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type NavigationProps = {
  navigate: (screen: string, params: { emotion: string }) => void;
};

const EMOTION_TAGS = ["Anxious", "Grateful", "Overwhelmed", "Hopeful", "Lost"];

const OnboardingNewScreen = () => {
  const router = useRouter();

  const handleTagPress = (emotion: string) => {
    router.push({
      pathname: "/ValidationScreen",
      params: { emotion: emotion },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>How are you, really?</Text>

        <View style={styles.tagsContainer}>
          {EMOTION_TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.tag}
              onPress={() => handleTagPress(tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212121",
    textAlign: "center",
    marginBottom: 40,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  tag: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 8,
    minWidth: (width - 40 - 64) / 2,
    alignItems: "center",
  },
  tagText: {
    fontSize: 16,
    color: "#424242",
  },
});

export default OnboardingNewScreen;
