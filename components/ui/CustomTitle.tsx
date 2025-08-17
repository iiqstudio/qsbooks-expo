import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

export default function CustomTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1D2939",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 32,
  },
});
