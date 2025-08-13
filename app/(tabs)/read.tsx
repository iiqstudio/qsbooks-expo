import * as Clipboard from "expo-clipboard";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const TOOLTIP_WIDTH = 250;
const TOOLTIP_HEIGHT = 50;
const ARROW_HEIGHT = 10;

const Read = () => {
  const [content, setContent] = useState("");
  const [selection, setSelection] = useState({
    visible: false,
    text: "",
    position: { top: 0, left: 0 },
  });
  const webViewRef = useRef(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/iiqstudio/bible-test/1ch.json")
      .then((res) => res.json())
      .then((data) => {
        let html = `<h1>${data.book}</h1>`;
        data.chapters.forEach((ch) => {
          html += `<h2>${ch.title}</h2>`;
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
          if (!data.text || data.text.trim() === "") {
            if (selection.visible) {
              setSelection((prev) => ({ ...prev, visible: false }));
            }
            return;
          }

          const { top, left, width, height } = data.rect;

          // Рассчитываем позицию ПОД текстом
          const newPosition = {
            top: top + height,
            left: Math.max(left + width / 2 - TOOLTIP_WIDTH / 2, 0),
          };

          setSelection({
            visible: true,
            text: data.text,
            position: newPosition,
          });
          break;

        case "dismiss":
          if (selection.visible) {
            setSelection((prev) => ({ ...prev, visible: false }));
          }
          break;
      }
    } catch (error) {
      console.error("Failed to parse message from WebView", error);
    }
  };

  const handleCopy = async () => {
    if (selection.text) {
      await Clipboard.setStringAsync(selection.text);
    }
    setSelection((prev) => ({ ...prev, visible: false }));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: selection.text, // Делимся выделенным текстом
      });
    } catch (error) {
      console.error("Ошибка Share API:", (error as Error).message);
    }
    setSelection((prev) => ({ ...prev, visible: false }));
  };

  const handleDiscuss = () => {
    console.log("Обсудить с ИИ:", selection.text);
    setSelection((prev) => ({ ...prev, visible: false }));
  };

  const injectedJavaScript = `
      (function() {
        function sendSelectionData() {
          const selection = window.getSelection();
          const selectedText = selection.toString();

          if (selectedText.trim().length > 0) {
            const range = selection.getRangeAt(0);
            // getBoundingClientRect() дает позицию относительно видимой части экрана.
            const rect = range.getBoundingClientRect(); 

            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'selection',
              text: selectedText,
              rect: {
                  // Отправляем "чистые" координаты, не добавляя прокрутку
                  top: rect.top, 
                  left: rect.left,
                  width: rect.width,
                  height: rect.height
              }
            }));
          } else {
            // Если выделение снято, отправляем команду скрыть меню
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'dismiss' }));
          }
        }
        
        document.addEventListener('selectionchange', sendSelectionData);
        document.addEventListener('mouseup', () => {
            setTimeout(() => {
                if (window.getSelection().toString().trim().length === 0) {
                     window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'dismiss' }));
                }
            }, 50);
        });
        true;
      })();
    `;

  const bgColor = "#fff";
  const textColor = "#000";

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <style>
          /* Отключаем стандартное меню iOS/Android */
          * {
            -webkit-touch-callout: none !important;
            -webkit-user-select: text !important;
            user-select: text !important;
          }
          body { 
            background-color: ${bgColor}; 
            color: ${textColor}; 
            font-family: -apple-system, sans-serif;
            font-size: 18px; 
            line-height: 1.6; 
            padding: 16px; 
          }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
        style={{ backgroundColor: bgColor }}
      />
      {selection.visible && (
        <View
          style={[
            styles.tooltipContainer,
            { top: selection.position.top, left: selection.position.left },
          ]}
        >
          <View style={styles.arrow} />
          <View style={styles.tooltip}>
            <TouchableOpacity onPress={handleCopy} style={styles.tooltipButton}>
              <Text style={styles.tooltipText}>Copy</Text>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity
              onPress={handleShare}
              style={styles.tooltipButton}
            >
              <Text style={styles.tooltipText}>Share</Text>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity
              onPress={handleDiscuss}
              style={styles.tooltipButton}
            >
              <Text style={styles.tooltipText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    color: "#000", // Черный текст для светлого меню
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
