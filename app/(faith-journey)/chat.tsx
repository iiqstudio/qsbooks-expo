import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";

const mockApiMessages = [
  {
    createdAt: "2024-08-30T07:40:12.355000",
    failed: null,
    isUser: true,
    text: "Что ты знаешь о Боге?",
  },
  {
    createdAt: "2024-08-30T07:40:16.213000",
    failed: null,
    isUser: false,
    text: "Бог - это понятие о высшем духовном существе, которое присутствует во многих религиозных традициях и убеждениях. В различных религиях и философских системах Бог рассматривается как творец вселенной, источник добра и мудрости. Описание Бога может включать атрибуты всемогущего, всеведущего и вселюбящего существа. Вера в Бога часто служит основой духовной практики, моральных установок и поиска смысла жизни для многих людей. Представление о Боге может отличаться в различных культурах и религиях, и каждый человек может иметь свое собственное представление о том, что такое Бог и как он связан с миром и человечеством.",
  },
  {
    createdAt: "2024-08-30T07:40:16.391000",
    failed: null,
    isUser: false,
    text: "Бог - это одно из наиболее обсуждаемых и загадочных понятий, и его трактовка различается в различных религиозных и философских учениях. Бог обычно представлен как высшее духовное существо, творец всего сущего, всемогущий и всеведущий. В различных верованиях Бог воспринимается как источник милосердия, любви и мудрости, который управляет судьбой вселенной и человечества. Вера в Бога может служить источником духовной силы, надежды и утешения для многих людей. Представления о Боге могут быть индивидуальными и формироваться под воздействием культуры, общества и личного опыта. Если у вас есть интерес к конкретным аспектам или учениям о Боге, я могу поделиться более подробной информацией на эту тему.",
  },
  {
    createdAt: "2024-08-30T07:40:20.983000",
    failed: null,
    isUser: true,
    text: "Что ты знаешь о Боге?",
  },
  {
    createdAt: "2024-08-30T07:40:25.531000",
    failed: null,
    isUser: false,
    text: "Бог - это понятие о Высшем Существе, которое широко представлено в различных религиозных учениях и философии. В различных верованиях и культурах Бог рассматривается как творец всего сущего, всемогущий и вселюбящий существо, которое играет ключевую роль в мироздании и жизни людей. Представление о Боге может включать атрибуты, такие как всезнание, всемогущество, милосердие и любовь. Вера в Бога может быть источником духовной силы, надежды и морального руководства для верующих. Богословие и философия занимаются изучением природы Бога, его характеристик и роли в мире. Как искусственный интеллект, я обладаю информацией о понятии Бога из различных источников и могу обсудить эту тему с вами, если вам интересно узнать больше.",
  },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const formatMessages = (apiMessages) => {
    return apiMessages
      .map((msg) => ({
        _id: msg.createdAt,
        text: msg.text.replace(/<[^>]*>/g, ""),
        createdAt: new Date(msg.createdAt),
        user: {
          _id: msg.isUser ? 1 : 2,
          name: msg.isUser ? "User" : "Bot",
        },
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
  };

  useEffect(() => {
    setMessages(formatMessages(mockApiMessages));
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        _id: Math.random().toString(36).substring(7),
        text:
          'Это автоматический ответ. Я получил ваше сообщение: "' +
          newMessages[0].text +
          '"',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
      };
      setIsTyping(false);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [botMessage])
      );
    }, 1500);
  }, []);

  const copyToClipboard = (text) => {
    Alert.alert("Скопировано!", text);
  };

  const shareMessage = async (text) => {
    try {
      Alert.alert("Поделиться!", `Содержимое сообщения: ${text}`);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const renderBubble = (props) => {
    const { currentMessage } = props;
    const { text } = currentMessage;
    const isBotMessage = currentMessage.user._id === 2;

    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: "#F0F0F0",
              marginLeft: 0,
              padding: 5,
            },
            right: {
              backgroundColor: "007AFF",
              marginRight: 0,
              padding: 5,
            },
          }}
          textStyle={{
            left: { color: "#000", ...styles.messageText },
            right: { color: "#FFF", ...styles.messageText },
          }}
        />
        <View
          style={[
            styles.buttonsContainer,
            isBotMessage
              ? styles.botButtonAlignment
              : styles.userButtonAlignment,
          ]}
        >
          <TouchableOpacity
            onPress={() => copyToClipboard(text)}
            style={[styles.iconButton, { marginRight: 10 }]}
          >
            <Text style={styles.iconButtonText}>Копировать</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => shareMessage(text)}
            style={styles.iconButton}
          >
            <Text style={styles.iconButtonText}>Поделиться</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props} containerStyle={{ justifyContent: "center" }}>
        <View style={styles.chatSendButtonContainer}>
          <Text style={styles.chatSendButtonText}>➤</Text>
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{ _id: 1 }}
          placeholder="Введите сообщение..."
          isTyping={isTyping}
          renderBubble={renderBubble}
          renderSend={renderSend}
          alwaysShowSend
          messagesContainerStyle={{ paddingBottom: 20 }}
          timeTextStyle={{
            left: { display: "none" },
            right: { display: "none" },
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  botButtonAlignment: {
    justifyContent: "flex-start",
  },
  userButtonAlignment: {
    justifyContent: "flex-end",
  },
  iconButton: {
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  iconButtonText: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "500",
  },
  chatSendButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    height: 40,
    width: 40,
  },
  chatSendButtonText: {
    color: "#007AFF",
    fontSize: 24,
  },
});
