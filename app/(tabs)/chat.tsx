import * as Clipboard from "expo-clipboard";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bubble,
  Composer,
  GiftedChat,
  MessageText,
} from "react-native-gifted-chat";
import HtmlView from "react-native-htmlview";
import { TypingAnimation } from "react-native-typing-animation";
// --- ЗАГЛУШКИ для кастомных компонентов ---
// TODO: Замени эти заглушки на свои настоящие компоненты из отдельных файлов

const CopyIconSVG = () => <Text style={{ color: "#575FEB" }}>C</Text>;
const ShareIconSVG = () => <Text style={{ color: "#575FEB" }}>S</Text>;

// Простая заглушка для CustomSend
const CustomSend = (props) => (
  <TouchableOpacity
    onPress={() => props.onSend({ text: props.text.trim() }, true)}
    style={styles.chatSendButtonContainer}
  >
    <Text style={styles.chatSendButtonText}>Send</Text>
  </TouchableOpacity>
);

// Простая заглушка для CustomModal
const CustomModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text>Это модальное окно</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ color: "blue", marginTop: 20 }}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- КОНЕЦ ЗАГЛУШЕК ---

export default function ChatScreen() {
  // Начальные сообщения для отображения в UI
  const [messages, setMessages] = useState([
    {
      _id: 2,
      text: "Отлично! Если будут вопросы по интеграции логики, смело спрашивай.",
      createdAt: new Date(Date.now() - 60000), // 1 минуту назад
      user: {
        _id: 2,
        name: "Bot",
      },
    },
    {
      _id: 1,
      text: "Привет! Это UI-компонент чата. Логика пока отключена.",
      createdAt: new Date(Date.now() - 120000), // 2 минуты назад
      user: {
        _id: 1, // Пользователь
        name: "User",
      },
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Для проверки анимации

  // Упрощенная функция отправки: просто добавляет сообщение в массив
  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    // TODO: Здесь будет логика отправки сообщения на сервер
  }, []);

  // --- Функции для кнопок (копировать/поделиться) ---
  const copyToClipboard = async (text: string) => {
    // Убираем HTML-теги перед копированием
    const cleanedText = text.replace(/<[^>]*>/g, "");
    await Clipboard.setStringAsync(cleanedText);
    alert("Скопировано!"); // Просто для проверки
  };

  const shareMessage = async (text: any) => {
    try {
      await Share.share({
        message: text.replace(/<[^>]*>/g, ""), // Делимся чистым текстом
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // --- Кастомные рендер-функции для GiftedChat ---

  const renderMessageText = (props) => {
    const { currentMessage } = props;
    const containsHtml = /<\/?[a-z][\s\S]*>/i.test(currentMessage.text);

    if (containsHtml) {
      return (
        <HtmlView
          value={currentMessage.text}
          stylesheet={htmlStyles}
          onLinkPress={(url) => {
            console.log("Нажата ссылка:", url);
            // TODO: Здесь будет логика навигации (Expo Router)
            // например, router.push('/ideas');
          }}
        />
      );
    }
    return <MessageText {...props} />;
  };

  const renderBubble = (props) => {
    const { currentMessage } = props;
    const isBotMessage = currentMessage.user._id !== 1;

    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            left: { backgroundColor: "#F0F0F0", marginLeft: 0, padding: 5 },
            right: { backgroundColor: "#575FEB", marginRight: 0, padding: 5 },
          }}
          textStyle={{
            left: { color: "#000", ...styles.messageText },
            right: { color: "#FFF", ...styles.messageText },
          }}
        />
        <View
          style={[
            isBotMessage
              ? styles.botButtonAlignment
              : styles.userButtonAlignment,
          ]}
        >
          <TouchableOpacity
            onPress={() => copyToClipboard(currentMessage.text)}
            style={[styles.iconButton, { marginRight: 5 }]}
          >
            <CopyIconSVG />
            <Text style={styles.iconButtonText}>Копировать</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => shareMessage(currentMessage.text)}
            style={styles.iconButton}
          >
            <ShareIconSVG />
            <Text style={styles.iconButtonText}>Поделиться</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // --- Основной JSX компонента ---
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{ _id: 1 }}
          text={inputText}
          onInputTextChanged={(text) => setInputText(text)}
          placeholder="Введите сообщение..."
          isTyping={isTyping}
          alwaysShowSend
          renderSend={(props) => <CustomSend {...props} />}
          renderComposer={(props) => (
            <Composer {...props} textInputStyle={styles.textInputCentered} />
          )}
          renderBubble={renderBubble}
          renderTime={() => null} // Скрываем время
          renderMessageText={renderMessageText}
          messagesContainerStyle={{
            backgroundColor: "white",
            paddingBottom: 20,
          }}
          renderFooter={() =>
            isTyping && (
              <View style={styles.typingAnimation}>
                <TypingAnimation dotColor="#000" />
              </View>
            )
          }
        />
        <CustomModal isVisible={false} onClose={() => {}} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- Стили ---

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  keyboardAvoidingView: { flex: 1 },
  botButtonAlignment: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
  },
  userButtonAlignment: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    marginBottom: 10,
    marginRight: 10,
  },
  iconButton: {
    borderColor: "#575FEB",
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconButtonText: {
    color: "#575FEB",
    fontSize: 12,
    paddingLeft: 5,
  },
  textInputCentered: {
    textAlignVertical: "center",
  },
  chatSendButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    height: "100%",
  },
  chatSendButtonText: {
    color: "#575FEB",
    fontSize: 16,
    fontWeight: "600",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  typingAnimation: {
    padding: 10,
    marginLeft: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  // Стили для модального окна-заглушки
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
});

const htmlStyles = StyleSheet.create({
  a: { color: "blue", textDecorationLine: "underline" },
  b: { fontWeight: "bold" },
  p: { fontSize: 16, color: "#000" },
  div: { fontSize: 16, color: "#000" },
});
