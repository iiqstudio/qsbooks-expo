import CustomHeader from "@/components/CustomHeader";
import SelectionActionsModal from "@/components/ui/SelectionActionsModal";
import StyleSettingsModal from "@/components/ui/StyleSettingsModal";
import * as Clipboard from "expo-clipboard";
import { Stack } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, Share, StyleSheet } from "react-native";
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

const Read = () => {
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState(18);
  const [activeTheme, setActiveTheme] = useState(themes.light);
  const [selection, setSelection] = useState({
    visible: false,
    text: "",
    position: { top: 0, left: 0 },
  });
  const webViewRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [selectedText, setSelectedText] = useState("");
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);
  const [isStyleModalVisible, setStyleModalVisible] = useState(false);
  const openStyleModal = () => setStyleModalVisible(true);
  const closeStyleModal = () => setStyleModalVisible(false);

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
    fetch("https://cdn.jsdelivr.net/gh/iiqstudio/bible-test/1ch.json")
      .then((res) => res.json())
      .then((data: BookData) => {
        setBookData(data);
        let html = `<h1>${data.book}</h1>`;
        data.chapters.forEach((ch) => {
          html += `<h2 id="chapter-${ch.chapter_number}">${ch.title}</h2>`;
          ch.verses.forEach((v) => {
            html += `<p><span>${v.verse_number}. ${v.text}</span></p>`;
          });
        });
        setContent(html);
      });
  }, []);

  const onMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      switch (data.type) {
        case "selection":
          // 3. НОВАЯ ЛОГИКА ПРИ ВЫДЕЛЕНИИ ТЕКСТА
          if (data.text && data.text.trim() !== "") {
            setSelectedText(data.text); // Сохраняем текст
            openSelectionModal(); // Открываем модалку
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
            setCurrentChapter(data.chapter);
          }
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
          }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `;

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
});

export default Read;
