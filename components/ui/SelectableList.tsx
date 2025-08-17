import React from "react";
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface Option {
  emoji: string;
  text: string;
}

interface SelectableListProps {
  options: Option[];
  selectedOption: number | null;
  onSelect: (index: number) => void;
}

const SelectableList: React.FC<SelectableListProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const renderItem: ListRenderItem<Option> = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.option, selectedOption === index && styles.selectedOption]}
      onPress={() => onSelect(index)}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text
        style={[
          styles.optionText,
          selectedOption === index && styles.selectedOptionText,
        ]}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={options}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={styles.optionsContainer}
      contentContainerStyle={styles.listContentContainer} // Добавляем отступы для самого контента
      showsVerticalScrollIndicator={false}
      extraData={selectedOption}
    />
  );
};

// --- Обновленные стили ---
const styles = StyleSheet.create({
  optionsContainer: {
    width: "100%",
  },
  listContentContainer: {
    paddingHorizontal: 24, // Внешние отступы для всего списка
    paddingVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#F0F0F0",

    ...Platform.select({
      ios: {
        shadowColor: "#1D2939",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  selectedOption: {
    borderColor: "#4A85FF",
    backgroundColor: "#F0F5FF",
    borderWidth: 2,
  },
  emoji: {
    fontSize: 24,
    marginRight: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#1D2939",
  },
  selectedOptionText: {},
});

export default SelectableList;
