import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Chip } from "react-native-paper";
import bookTitles from "../const/book_titles.json";

interface QuoteData {
  category: string;
  id: string;
  quote: string;
}

interface QuoteInfo {
  bookName: string;
  chapter: string;
  verse: string;
}

interface BookTitles {
  [key: string]: {
    en: string;
  };
}

const typedBookTitles: BookTitles = bookTitles;

const RandomQuoteComponent: React.FC = () => {
  const router = useRouter();
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [quoteInfo, setQuoteInfo] = useState<QuoteInfo>({
    bookName: "",
    chapter: "",
    verse: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setIsLoading(true);
    setError(null);
    fetch("https://holy.qstudio.org/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        device_id: "B64C3E44-6CB5-4510-80B3-8E62F405978C",
      }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Не удалось получить ответ от сервера");
        return response.json();
      })
      .then((data) => {
        const today = new Date().toISOString().split("T")[0];
        const quotesForToday: QuoteData[] =
          data?.appSettings?.quotesOfTheDays?.[today];

        if (quotesForToday && quotesForToday.length > 0) {
          const randomIndex = Math.floor(Math.random() * quotesForToday.length);
          setQuoteData(quotesForToday[randomIndex]);
        } else {
          throw new Error("На сегодня цитат не найдено.");
        }
      })
      .catch((err: Error) => {
        console.error("Ошибка при загрузке данных:", err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const parseReference = (inputId: string) => {
    const parts = inputId.split("-");
    const bookAbbr = parts[0];
    const chapter = parts[2];
    const verse = parts[4];
    const bookName = typedBookTitles[bookAbbr]?.en || "Неизвестная книга";
    setQuoteInfo({ bookName, chapter, verse });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (quoteData?.id) {
      parseReference(quoteData.id);
    }
  }, [quoteData]);

  const shareNavigateHandler = async () => {
    if (!quoteData?.quote) return;
    try {
      await Share.share({
        message: `"${quoteData.quote}" - ${quoteInfo.bookName} ${quoteInfo.chapter}:${quoteInfo.verse}`,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const discussNavigateHandler = () => {
    router.push("/chat");
  };

  const handleQuoteClick = () => {
    Alert.alert("Цитата нажата", `ID: ${quoteData?.id}`);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Ошибка: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.block} mode="contained">
        <Card.Content>
          <Text style={styles.title}>Цитата дня</Text>
          <TouchableOpacity onPress={handleQuoteClick}>
            <Text style={styles.quoteTextContent}>{quoteData?.quote}</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <View style={styles.paragraphSubtitle}>
              <Text style={styles.quoteSourceText}>
                {quoteInfo.bookName} {quoteInfo.chapter}:{quoteInfo.verse}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Chip
                textStyle={styles.chipText}
                style={styles.chip}
                onPress={shareNavigateHandler}
              >
                Поделиться
              </Chip>
              <Chip
                textStyle={styles.chipText}
                style={styles.chip}
                onPress={discussNavigateHandler}
              >
                Чат
              </Chip>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
  block: {
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 20,
    backgroundColor: "white",
    padding: 4,
  },
  title: {
    color: "#969696",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  quoteTextContent: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 15,
    fontFamily: "Times New Roman",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    flexWrap: "nowrap",
  },
  paragraphSubtitle: {
    flex: 1,
    minWidth: 150,
  },
  quoteSourceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  chip: {
    backgroundColor: "#E5F1FD",
    borderRadius: 20,
  },
  chipText: {
    color: "#056FDD",
  },
});

export default RandomQuoteComponent;
