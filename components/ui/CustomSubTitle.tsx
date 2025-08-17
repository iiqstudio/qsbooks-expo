import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

export default function CustomSubTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
  },
});
