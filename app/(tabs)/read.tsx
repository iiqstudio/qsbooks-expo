import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

const Read = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/iiqstudio/bible-test/1ch.json")
      .then((res) => res.json())
      .then((data) => {
        let html = `${data.book}\n\n`;
        data.chapters.forEach((ch) => {
          html += `${ch.title}\n`;
          ch.verses.forEach((v) => {
            html += `${v.verse_number}. ${v.text}\n`;
          });
          html += "\n";
        });
        setContent(html);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>{content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  text: { fontSize: 16, lineHeight: 24 },
});

export default Read;
