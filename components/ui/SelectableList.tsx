import React from "react";
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export type Option = {
  id: string | number;
  emoji: string;
  text: string;
};

type SelectableListProps = {
  data: Option[];
  selectedId: string | number | null;
  onSelect: (id: string | number) => void;
  style?: StyleProp<ViewStyle>;
};

const ListItem = React.memo(
  ({
    item,
    isSelected,
    onPress,
  }: {
    item: Option;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  )
);

/**
 * Переиспользуемый компонент для отображения списка с возможностью выбора одного элемента.
 */
const SelectableList: React.FC<SelectableListProps> = ({
  data,
  selectedId,
  onSelect,
  style,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          isSelected={item.id === selectedId}
          onPress={() => onSelect(item.id)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={style}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#6D7587",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedItemContainer: {
    borderColor: "#80B9FF",
  },
  emoji: {
    fontSize: 22,
    marginRight: 16,
  },
  itemText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
});

export default SelectableList;
