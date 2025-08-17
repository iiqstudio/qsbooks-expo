import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import BackSvg from "../../assets/images/svg/back_dark_blue.svg";

type ProgressBarProps = {
  progress?: number;
  onBackPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  onBackPress,
  style,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <BackSvg width={24} height={24} />
      </TouchableOpacity>

      <View style={styles.track}>
        <View style={[styles.bar, { width: `${clampedProgress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
});

export default ProgressBar;
