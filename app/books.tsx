import { AntDesign, Feather } from "@expo/vector-icons";
import { router, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";

const mockBooks = [
  { name: "Бытие", chapters: 50 },
  { name: "Исход", chapters: 40 },
  { name: "Левит", chapters: 27 },
  { name: "Числа", chapters: 36 },
  { name: "Второзаконие", chapters: 34 },
];

const BookItem = ({ book, isExpanded, onPress }: any) => {
  const router = useRouter();

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <View style={styles.bookContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <TouchableOpacity onPress={onPress} style={styles.bookHeader}>
        <Text style={styles.bookTitle}>{book.name}</Text>
        {isExpanded ? (
          <AntDesign name="up" size={20} color="#8E8E93" />
        ) : (
          <AntDesign name="down" size={20} color="#8E8E93" />
        )}
      </TouchableOpacity>

      <Collapsible collapsed={!isExpanded}>
        <View style={styles.chaptersGrid}>
          {chapters.map((chapterNumber) => (
            <TouchableOpacity
              key={chapterNumber}
              style={styles.chapterTouchable}
              onPress={() =>
                console.log(`Переход к: ${book.name}, Глава ${chapterNumber}`)
              }
            >
              <Text style={styles.chapterText}>{chapterNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Collapsible>
    </View>
  );
};

function BooksScreen(props: any) {
  const [expandedBook, setExpandedBook] = useState("Исход");

  const handleToggleBook = (bookName: any) => {
    setExpandedBook((prevExpandedBook) =>
      prevExpandedBook === bookName ? null : bookName
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Books</Text>
        <TouchableOpacity>
          <Feather name="star" size={22} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {mockBooks.map((book) => (
          <BookItem
            key={book.name}
            book={book}
            isExpanded={expandedBook === book.name}
            onPress={() => handleToggleBook(book.name)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
  },
  bookContainer: {
    paddingHorizontal: 20,
  },
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  bookTitle: {
    fontSize: 17,
    color: "#000000",
  },
  chaptersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingBottom: 15,
  },
  chapterTouchable: {
    backgroundColor: "#F0F8FF",
    width: 58,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 4,
  },
  chapterText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "400",
  },
});

export default BooksScreen;
