import CustomHeader from "@/components/CustomHeader";
import SelectionActionsModal from "@/components/ui/SelectionActionsModal";
import StyleSettingsModal from "@/components/ui/StyleSettingsModal";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const TOOLTIP_WIDTH = 250;
const TOOLTIP_HEIGHT = 50;
const ARROW_HEIGHT = 10;

const themes = {
  light: {
    name: "light",
    bgColor: "#FFFFFF",
    textColor: "#000000",
    headerBg: "#FFFFFF",
    headerButtonBg: "#EFEFF4",
    headerButtonColor: "#007AFF",
    separatorColor: "#D1D1D6",
  },
  sepia: {
    name: "sepia",
    bgColor: "#F5EFE6",
    textColor: "#5B4636",
    headerBg: "#F5EFE6",
    headerButtonBg: "#E4DACE",
    headerButtonColor: "#5B4636",
    separatorColor: "#D1C4B3",
  },
  dark: {
    name: "dark",
    bgColor: "#121212",
    textColor: "#FFFFFF",
    headerBg: "#121212",
    headerButtonBg: "#2C2C2E",
    headerButtonColor: "#FFFFFF",
    separatorColor: "#424244",
  },
};

interface Verse {
  verse_number: number;
  text: string;
}
interface Chapter {
  chapter_number: number;
  title: string;
  verses: Verse[];
}

interface BookData {
  book: string;
  chapters: Chapter[];
}

const CDN_BASE_URL = "https://cdn.jsdelivr.net/gh/iiqstudio/bible-test/";
const CACHE_DIRECTORY = FileSystem.documentDirectory + "bible_books/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(CACHE_DIRECTORY);
  if (!dirInfo.exists) {
    console.log("Создаем директорию для кэша:", CACHE_DIRECTORY);
    await FileSystem.makeDirectoryAsync(CACHE_DIRECTORY, {
      intermediates: true,
    });
  }
};

const Read = () => {
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState(18);
  const [activeTheme, setActiveTheme] = useState(themes.light);
  const { bookId, chapter } = useLocalSearchParams();
  const [selection, setSelection] = useState({
    visible: false,
    text: "",
    position: { top: 0, left: 0 },
  });
  const router = useRouter();
  const webViewRef = useRef<WebView>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [currentChapter, setCurrentChapter] = useState(
    parseInt(chapter as string, 10) || 1
  );
  const [selectedText, setSelectedText] = useState("");
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavVisible, setNavVisible] = useState(false);

  const handleChatPress = () => {
    console.log("Кнопка чата с ИИ нажата!");
  };

  const navigateToBooksScreen = () => {
    router.push("/books");
  };

  const openSelectionModal = () => setSelectionModalVisible(true);
  const closeSelectionModal = () => {
    setSelectionModalVisible(false);
    setSelectedText("");
  };

  const injectedJavaScript = `
      (function() {
        function sendSelectionData() {
          const selection = window.getSelection();
          const selectedText = selection.toString();
          if (selectedText.trim().length > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect(); 
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'selection',
              text: selectedText,
              rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
            }));
          }
        }

        document.removeEventListener('selectionchange', sendSelectionData);

        const handleInteractionEnd = () => {
          setTimeout(() => {
            const selectionText = window.getSelection().toString().trim();
            if (selectionText.length > 0) {
              sendSelectionData();
            } else {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'dismiss' }));
            }
          }, 100);
        };
        document.addEventListener('mouseup', handleInteractionEnd);
        document.addEventListener('touchend', handleInteractionEnd);

        try {
          const headings = document.querySelectorAll('h2[id^="chapter-"]');
          if (headings.length > 0) {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const chapterNumber = parseInt(entry.target.id.split('-')[1], 10);
                  if (chapterNumber) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'chapter-change',
                      chapter: chapterNumber
                    }));
                  }
                }
              });
            }, { threshold: 0.1 });
            headings.forEach(heading => observer.observe(heading));
          }
        } catch (e) { /* ... */ }

        let hasReachedEnd = false;
        window.addEventListener('scroll', () => {
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
        if (isAtBottom && !hasReachedEnd) {
          hasReachedEnd = true;
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'show-nav' }));
        } 
        else if (!isAtBottom && hasReachedEnd) {
          hasReachedEnd = false;
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'hide-nav' }));
        }
      });

        true;
      })();
    `;

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleThemeChange = useCallback(
    (themeName: "light" | "sepia" | "dark") => {
      setActiveTheme(themes[themeName]);
    },
    []
  );

  const increaseFontSize = useCallback(() => {
    setFontSize((currentSize) => Math.min(32, currentSize + 2));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((currentSize) => Math.max(14, currentSize - 2));
  }, []);

  useEffect(() => {
    if (webViewRef.current) {
      const script = `
        document.body.style.backgroundColor = '${activeTheme.bgColor}';
        document.body.style.color = '${activeTheme.textColor}';
        document.body.style.fontSize = '${fontSize}px';
        true; // Обязательно для iOS
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [activeTheme, fontSize]);

  useEffect(() => {
    const loadBook = async (language: string, bookIdToLoad: string) => {
      setIsLoading(true);
      await ensureDirExists();

      const fileName = `${language}_${bookIdToLoad}.json`;
      const localUri = CACHE_DIRECTORY + fileName;
      const remoteUrl = `${CDN_BASE_URL}${bookIdToLoad}.json`;

      const fileInfo = await FileSystem.getInfoAsync(localUri);
      let bookJsonData = null;

      try {
        if (fileInfo.exists) {
          console.log("Загружаем книгу из кэша:", localUri);
          const cachedContent = await FileSystem.readAsStringAsync(localUri);
          bookJsonData = JSON.parse(cachedContent);
        } else {
          console.log("Загружаем книгу с CDN:", remoteUrl);
          const { uri } = await FileSystem.downloadAsync(remoteUrl, localUri);
          const newContent = await FileSystem.readAsStringAsync(uri);
          bookJsonData = JSON.parse(newContent);
        }
        setBookData(bookJsonData);
      } catch (error) {
        console.error("Ошибка загрузки книги:", error);
        setContent("<h1>Не удалось загрузить книгу</h1>");
      } finally {
        setIsLoading(false);
      }
    };

    if (bookId) {
      loadBook("ru", bookId as string);
    }
  }, [bookId]);

  useEffect(() => {
    if (bookData) {
      setNavVisible(false);
      const chapterData = bookData.chapters.find(
        (ch) => ch.chapter_number === currentChapter
      );

      if (chapterData) {
        let html = `<h1>${bookData.book}</h1>`;
        html += `<h2 id="chapter-${chapterData.chapter_number}">${chapterData.title}</h2>`;
        chapterData.verses.forEach((v) => {
          html += `<p><span>${v.verse_number}. ${v.text}</span></p>`;
        });
        setContent(html);
      } else {
        setContent(`<h1>Глава ${currentChapter} не найдена</h1>`);
      }
    }
  }, [bookData, currentChapter]);

  const onMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      switch (data.type) {
        case "selection":
          if (data.text && data.text.trim() !== "") {
            setSelectedText(data.text);
            openSelectionModal();
          } else {
            closeSelectionModal();
          }
          break;

        case "dismiss":
          if (selection.visible) {
            setSelection((prev) => ({ ...prev, visible: false }));
          }
          break;
        case "chapter-change":
          if (data.chapter !== currentChapter) {
          }
          break;
        case "show-nav":
          setNavVisible(true);
          break;

        case "hide-nav":
          setNavVisible(false);
          break;
      }
    } catch (error) {
      console.error("Failed to parse message from WebView", error);
    }
  };

  const handleCopy = async () => {
    if (selectedText) {
      await Clipboard.setStringAsync(selectedText);
    }
    closeSelectionModal();
  };

  const handleShare = async () => {
    try {
      if (selectedText) {
        await Share.share({ message: selectedText });
      }
    } catch (error) {}
    closeSelectionModal();
  };

  const handleDiscuss = () => {
    console.log("Обсудить с ИИ:", selectedText);
    closeSelectionModal();
  };

  const goToNextChapter = () => {
    if (bookData && currentChapter < bookData.chapters.length) {
      setCurrentChapter((prev) => prev + 1);
    }
  };

  const goToPreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
    }
  };

  const isFirstChapter = currentChapter === 1;
  const isLastChapter = bookData
    ? currentChapter === bookData.chapters.length
    : true;

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <style>
          * {
            -webkit-touch-callout: none !important;
            -webkit-user-select: text !important;
            user-select: text !important;
          }
         body { 
            background-color: ${activeTheme.bgColor}; 
            color: ${activeTheme.textColor}; 
            font-family: -apple-system, sans-serif;
            font-size: ${fontSize}px; 
            line-height: 1.6; 
            padding: 16px; 
            transition: background-color 0.3s, color 0.3s;
            padding-bottom: 80px;
          }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `;

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: activeTheme.headerBg,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={activeTheme.textColor} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeTheme.headerBg }]}
    >
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader
              bookTitle={bookData ? bookData.book : "Загрузка..."}
              chapter={currentChapter}
              onStylePress={openModal}
              theme={activeTheme}
              onBookPress={navigateToBooksScreen}
              onChapterPress={navigateToBooksScreen}
            />
          ),
        }}
      />
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
        style={{ backgroundColor: activeTheme.bgColor }}
      />

      {isNavVisible && (
        <View style={styles.navContainer}>
          <TouchableOpacity
            onPress={goToPreviousChapter}
            disabled={isFirstChapter}
          >
            <AntDesign
              name="leftcircleo"
              size={32}
              color={
                isFirstChapter
                  ? activeTheme.separatorColor
                  : activeTheme.headerButtonColor
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextChapter} disabled={isLastChapter}>
            <AntDesign
              name="rightcircleo"
              size={32}
              color={
                isLastChapter
                  ? activeTheme.separatorColor
                  : activeTheme.headerButtonColor
              }
            />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
        <Ionicons name="chatbubbles-outline" size={30} color="white" />
      </TouchableOpacity>

      <StyleSettingsModal
        isVisible={isModalVisible}
        onClose={closeModal}
        currentTheme={activeTheme.name}
        onThemeChange={handleThemeChange}
        onIncreaseFontSize={increaseFontSize}
        onDecreaseFontSize={decreaseFontSize}
      />
      <SelectionActionsModal
        isVisible={isSelectionModalVisible}
        onClose={closeSelectionModal}
        onCopy={handleCopy}
        onShare={handleShare}
        onDiscuss={handleDiscuss}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tooltipContainer: {
    position: "absolute",
    width: TOOLTIP_WIDTH,
    height: TOOLTIP_HEIGHT + ARROW_HEIGHT,
    alignItems: "center",
    zIndex: 1000,
  },
  tooltip: {
    width: "100%",
    height: TOOLTIP_HEIGHT,
    backgroundColor: "rgba(245, 245, 245, 0.95)",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrow: {
    width: 14,
    height: 14,
    backgroundColor: "rgba(245, 245, 245, 0.95)",
    transform: [{ rotate: "45deg" }],
    marginBottom: 55,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tooltipButton: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tooltipText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
  },
  separator: {
    width: 1,
    height: "40%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  navContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  chatButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 122, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    opacity: 0.6,
  },
});

export default Read;
