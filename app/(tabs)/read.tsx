import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const Read = () => {
  return (
    <WebView
      style={styles.container}
      source={{ html: "<h1><center>Hello world</center></h1>" }}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, color: "#fff" },
});

export default Read;
