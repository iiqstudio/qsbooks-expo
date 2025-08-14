import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ThemeIcon = ({ backgroundColor, isSelected, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.themeButton,
      { backgroundColor },
      isSelected && styles.selectedTheme,
    ]}
  >
    <View style={styles.line1} />
    <View style={styles.line2} />
    <View style={styles.line3} />
  </TouchableOpacity>
);

const StyleSettingsModal = ({
  isVisible,
  onClose,
  currentTheme,
  onThemeChange,
}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.handle} />

            {/* Настройки размера шрифта */}
            <View style={styles.settingRow}>
              <TouchableOpacity style={styles.fontSizeButton}>
                <Text style={styles.fontSizeTextSmall}>Аа</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.fontSizeButton}>
                <Text style={styles.fontSizeTextLarge}>Аа</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.settingRow}>
              <ThemeIcon
                backgroundColor="#FFFFFF"
                isSelected={currentTheme === "light"}
                onPress={() => onThemeChange("light")}
              />
              <ThemeIcon
                backgroundColor="#F5EFE6"
                isSelected={currentTheme === "sepia"}
                onPress={() => onThemeChange("sepia")}
              />
              <ThemeIcon
                backgroundColor="#121212"
                isSelected={currentTheme === "dark"}
                onPress={() => onThemeChange("dark")}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#D1D1D6",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 15,
  },
  fontSizeButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fontSizeTextSmall: {
    fontSize: 14,
  },
  fontSizeTextLarge: {
    fontSize: 20,
  },

  themeSettingRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  themeButton: {
    width: 60,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    paddingLeft: 8,
  },
  selectedTheme: {
    borderColor: "#007AFF",
  },
  line1: {
    width: "60%",
    height: 4,
    backgroundColor: "#8E8E93",
    marginBottom: 5,
    borderRadius: 2,
  },
  line2: {
    width: "80%",
    height: 4,
    backgroundColor: "#8E8E93",
    marginBottom: 5,
    borderRadius: 2,
  },
  line3: {
    width: "50%",
    height: 4,
    backgroundColor: "#8E8E93",
    borderRadius: 2,
  },
});

export default StyleSettingsModal;
