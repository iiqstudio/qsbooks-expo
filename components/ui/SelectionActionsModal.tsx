import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ShareImg from "../../assets/images/svg/share_black.svg";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onCopy: () => void;
  onShare: () => void;
  onDiscuss: () => void;
}

const SelectionActionsModal: React.FC<IProps> = ({
  isVisible,
  onClose,
  onCopy,
  onShare,
  onDiscuss,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.handle} />
              <TouchableOpacity style={styles.actionButton} onPress={onCopy}>
                <Ionicons name="copy-outline" size={22} color="#000" />
                <Text style={styles.actionText}>Copy</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={onShare}>
                {/* <Ionicons name="share-outline" size={22} color="#000" /> */}
                <ShareImg />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={onDiscuss}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={22}
                  color="#000"
                />
                <Text style={styles.actionText}>Discuss</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
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
    gap: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#D1D1D6",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 17,
    marginLeft: 15,
  },
});

export default SelectionActionsModal;
