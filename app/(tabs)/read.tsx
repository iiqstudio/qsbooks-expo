import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import { WebView } from "react-native-webview";

const Read = () => {
  const [content, setContent] = useState("");
  const theme = useColorScheme(); // light | dark

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/iiqstudio/bible-test/1ch.json")
      .then((res) => res.json())
      .then((data) => {
        let html = `<h1>${data.book}</h1>`;
        data.chapters.forEach((ch) => {
          html += `<h2>${ch.title}</h2>`;
          ch.verses.forEach((v) => {
            html += `<p>${v.verse_number}. ${v.text}</p>`;
          });
        });
        setContent(html);
      });
  }, []);

  const bgColor = theme === "dark" ? "#000" : "#fff";
  const textColor = theme === "dark" ? "#fff" : "#000";

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { background-color: #fff; font-size: 18px; line-height: 1.6; padding: 16px; }
          h1 { font-size: 24px; margin-bottom: 16px; }
          h2 { font-size: 20px; margin-top: 24px; }
          p { margin: 4px 0; }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView originWhitelist={["*"]} source={{ html: htmlContent }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});

export default Read;
