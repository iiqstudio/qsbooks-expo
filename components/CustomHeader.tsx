import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = ({
  bookTitle,
  chapter,
  onBookPress,
  onChapterPress,
  onStylePress,
  showBackButton = true,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.sideContainer}>
          {showBackButton && (
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.roundButton}
            >
              <Ionicons name="chevron-back" size={28} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={onBookPress} style={styles.titleButton}>
            <Text style={styles.titleText} numberOfLines={1}>
              {bookTitle} Mock text test
            </Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={onChapterPress}
            style={styles.chapterButton}
          >
            <Text style={styles.chapterText}>1{chapter}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sideContainer}>
          <TouchableOpacity
            onPress={onStylePress}
            style={[styles.roundButton, styles.alignRight]}
          >
            <Text style={styles.styleButtonText}>Аа</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 60,
  },
  sideContainer: {
    width: 50,
  },
  roundButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFEFF4",
    justifyContent: "center",
    alignItems: "center",
  },
  alignRight: {
    alignSelf: "flex-end",
  },
  centerContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#EFEFF4",
    borderRadius: 50,
    overflow: "hidden",
    marginHorizontal: 10,
    height: 44,
  },
  titleButton: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  separator: {
    width: 4,
    backgroundColor: "#fff",
  },
  chapterButton: {
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  chapterText: {
    color: "#007AFF",
    fontSize: 16,
  },
  styleButtonText: {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "500",
  },
});

export default CustomHeader;
