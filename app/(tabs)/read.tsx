import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Read = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Экран для Чтения</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, color: "#fff" },
});

export default Read;
