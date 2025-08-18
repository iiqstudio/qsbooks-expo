import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
  defaultRating?: number;
  starSize?: number;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  onRatingChange,
  defaultRating = 0,
  starSize = 40,
  maxStars = 5,
}) => {
  const [rating, setRating] = useState(defaultRating);

  const handleStarPress = (starIndex: number) => {
    const newRating = rating === starIndex ? starIndex - 1 : starIndex;
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <View style={styles.container}>
      {[...Array(maxStars)].map((_, index) => {
        const starIndex = index + 1;
        const iconName = starIndex <= rating ? "star" : "star-border";
        const iconColor = starIndex <= rating ? "#FFD700" : "#007AFF";

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={starIndex}
            onPress={() => handleStarPress(starIndex)}
          >
            <MaterialIcons
              name={iconName}
              size={starSize}
              color={iconColor}
              style={styles.star}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  star: {
    marginHorizontal: 4,
  },
});

export default StarRating;
