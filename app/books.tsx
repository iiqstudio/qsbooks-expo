import { router, Stack } from "expo-router";
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
import BackSvg from "../assets/images/svg/back_dark_blue.svg";
import DownSvg from "../assets/images/svg/down_black.svg";
import PurchaseSvg from "../assets/images/svg/purchase.svg";
import UpSvg from "../assets/images/svg/up_black.svg";

const allBooksOfTheBible = [
  // 📖 Ветхий Завет
  { name: "Бытие", chapters: 50 },
  { name: "Исход", chapters: 40 },
  { name: "Левит", chapters: 27 },
  { name: "Числа", chapters: 36 },
  { name: "Второзаконие", chapters: 34 },
  { name: "Иисус Навин", chapters: 24 },
  { name: "Судей", chapters: 21 },
  { name: "Руфь", chapters: 4 },
  { name: "1 Царств", chapters: 31 },
  { name: "2 Царств", chapters: 24 },
  { name: "3 Царств", chapters: 22 },
  { name: "4 Царств", chapters: 25 },
  { name: "1 Паралипоменон", chapters: 29, id: "1ch" },
  { name: "2 Паралипоменон", chapters: 36 },
  { name: "Ездра", chapters: 10 },
  { name: "Неемия", chapters: 13 },
  { name: "Есфирь", chapters: 10 },
  { name: "Иов", chapters: 42 },
  { name: "Псалтирь", chapters: 150 },
  { name: "Притчи", chapters: 31 },
  { name: "Екклесиаст", chapters: 12 },
  { name: "Песнь Песней", chapters: 8 },
  { name: "Исаия", chapters: 66 },
  { name: "Иеремия", chapters: 52 },
  { name: "Плач Иеремии", chapters: 5 },
  { name: "Иезекииль", chapters: 48 },
  { name: "Даниил", chapters: 12 },
  { name: "Осия", chapters: 14 },
  { name: "Иоиль", chapters: 3 },
  { name: "Амос", chapters: 9 },
  { name: "Авдий", chapters: 1 },
  { name: "Иона", chapters: 4 },
  { name: "Михей", chapters: 7 },
  { name: "Наум", chapters: 3 },
  { name: "Аввакум", chapters: 3 },
  { name: "Софония", chapters: 3 },
  { name: "Аггей", chapters: 2 },
  { name: "Захария", chapters: 14 },
  { name: "Малахия", chapters: 4 },

  // 📖 Новый Завет
  { name: "Матфей", chapters: 28 },
  { name: "Марк", chapters: 16 },
  { name: "Лука", chapters: 24 },
  { name: "Иоанн", chapters: 21 },
  { name: "Деяния", chapters: 28 },
  { name: "Римлянам", chapters: 16 },
  { name: "1 Коринфянам", chapters: 16, id: "1co" },
  { name: "2 Коринфянам", chapters: 13 },
  { name: "Галатам", chapters: 6 },
  { name: "Ефесянам", chapters: 6 },
  { name: "Филиппийцам", chapters: 4 },
  { name: "Колоссянам", chapters: 4 },
  { name: "1 Фессалоникийцам", chapters: 5 },
  { name: "2 Фессалоникийцам", chapters: 3 },
  { name: "1 Тимофею", chapters: 6 },
  { name: "2 Тимофею", chapters: 4 },
  { name: "Титу", chapters: 3 },
  { name: "Филимону", chapters: 1 },
  { name: "Евреям", chapters: 13 },
  { name: "Иакова", chapters: 5 },
  { name: "1 Петра", chapters: 5 },
  { name: "2 Петра", chapters: 3 },
  { name: "1 Иоанна", chapters: 5 },
  { name: "2 Иоанна", chapters: 1 },
  { name: "3 Иоанна", chapters: 1 },
  { name: "Иуды", chapters: 1 },
  { name: "Откровение", chapters: 22 },
];

const BookItem = ({ book, isExpanded, onPress, onChapterPress }: any) => {
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <View style={styles.bookContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <TouchableOpacity onPress={onPress} style={styles.bookHeader}>
        <Text style={styles.bookTitle}>{book.name}</Text>
        {isExpanded ? <UpSvg /> : <DownSvg />}
      </TouchableOpacity>

      <Collapsible collapsed={!isExpanded}>
        <View style={styles.chaptersGrid}>
          {chapters.map((chapterNumber) => (
            <TouchableOpacity
              key={chapterNumber}
              style={styles.chapterTouchable}
              onPress={() => onChapterPress(book, chapterNumber)}
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
  const [expandedBook, setExpandedBook] = useState(null);
  const [bookData, setBookData] = useState(null);

  const handleToggleBook = async (book: any) => {
    const isOpening = expandedBook !== book.name;

    if (isOpening) {
      setExpandedBook(book.name);
      if (book.id) {
        try {
          console.log(`Запрос данных для: ${book.name}...`);
          const response = await fetch(
            `https://cdn.jsdelivr.net/gh/iiqstudio/bible-test/${book.id}.json`
          );
          const data = await response.json();
          setBookData(data);
          console.log(`Данные для "${book.name}" успешно загружены.`);
        } catch (error) {
          console.error("Ошибка при загрузке данных книги:", error);
          setBookData(null);
        }
      } else {
        setBookData(null);
      }
    } else {
      setExpandedBook(null);
      setBookData(null);
    }
  };

  const handleChapterPress = (book: any, chapterNumber: number) => {
    if (book.id) {
      console.log(`Переход к книге: ${book.id}, Глава: ${chapterNumber}`);
      router.push({
        pathname: "/read",
        params: { bookId: book.id, chapter: chapterNumber },
      });
    } else {
      console.log(`Для книги "${book.name}" нет ссылки, переход невозможен.`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <BackSvg />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Books</Text>
        <TouchableOpacity>
          <PurchaseSvg />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {allBooksOfTheBible.map((book) => (
          <BookItem
            key={book.name}
            book={book}
            isExpanded={expandedBook === book.name}
            onPress={() => handleToggleBook(book)}
            onChapterPress={handleChapterPress}
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
    color: "#007AFF",
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
    color: "#0A0A0A",
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
  headerButton: {
    backgroundColor: "#E5F1FD",
    borderRadius: 50,
    color: "#40629C",
    marginHorizontal: 2,
    padding: 10,
    width: null,
  },
});

export default BooksScreen;
