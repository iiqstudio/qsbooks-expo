import i18n from "@/i18n";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import StarRating from "./StarRating";

const ASYNC_STORAGE_KEY = "app_has_been_rated";

const RateUsBlock: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkIfRated = async () => {
      try {
        const hasBeenRated = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (hasBeenRated === "true") {
          setIsVisible(false);
        }
      } catch (error) {
        console.error("Ошибка чтения из AsyncStorage:", error);
      }
    };

    checkIfRated();
  }, []);

  const handleClose = async () => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, "true");
      setIsVisible(false);
    } catch (error) {
      console.error("Ошибка записи в AsyncStorage:", error);
    }
  };

  const handleRating = (rating: number) => {
    Alert.alert("Спасибо!", `Вы поставили оценку ${rating} из 5.`);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card style={styles.block} mode="contained">
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t("rate")}</Text>
          <TouchableOpacity onPress={handleClose}>
            <MaterialIcons name="close" size={24} color="#969696" />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingContainer}>
          <StarRating onRatingChange={handleRating} />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  block: {
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 20,
    backgroundColor: "white",
    padding: 4,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#969696",
  },
  ratingContainer: {
    marginTop: 10,
  },
});

export default RateUsBlock;
