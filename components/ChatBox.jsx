import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// === Fallback Default Greeting ===
const fallbackIntro = `Hi, I’m Nuru—your digital companion here at Nairobi Chapel Ngong Road. Ask me anything—whether you're curious about ministries, giving, or your first Sunday!
I’m here 24/7 to help you feel at home. 🌱`;

// === Time-Aware Smart Greeting Detector ===
const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 17) return "Good afternoon!";
  return "Good evening!";
};

const detectGreetingResponse = (input) => {
  const normalized = input.toLowerCase();
  if (
    normalized.includes("good morning") ||
    normalized.includes("good afternoon") ||
    normalized.includes("good evening")
  ) {
    const correct = getTimeGreeting();
    return `Hey! Thanks for the warm greeting. It’s actually ${correct.toLowerCase()} here, but I’m really glad you dropped by. 😊 How can I help today?`;
  }
  return null;
};

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

  // === Fetch /config and inject random intro on mount ===
  useEffect(() => {
    const loadIntro = async () => {
      try {
        const res = await fetch("https://nuru-backend-os39.onrender.com/config");
        const config = await res.json();
        const intros = config?.intro_messages || [];
        const randomIntro = intros.length
          ? intros[Math.floor(Math.random() * intros.length)]
          : fallbackIntro;

        setMessages([{ sender: "bot", text: randomIntro }]);
      } catch (err) {
        console.error("Failed to load intro message from config:", err);
        setMessages([{ sender: "bot", text: fallbackIntro }]);
      }
    };

    loadIntro();
  }, []);

  // === Auto-scroll to latest message ===
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    // === Smart time-aware greeting (client-side) ===
    const smart = detectGreetingResponse(userMessage);
    if (smart) {
      setMessages((prev) => [...prev, { sender: "bot", text: smart }]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://nuru-backend-os39.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect to the assistant. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedMessage = (text) => {
    const parts = text.split(
      /(0701\s?777\s?888|\(?\+?254\)?\s?0725\s?650\s?737|https:\/\/nairobichapel\.net)/g
    );

    return parts.map((part, index) => {
      if (part.match(/0701\s?777\s?888/)) {
        return (
          <Text
            key={index}
            style={{ color: "#25D366" }}
            onPress={() => Linking.openURL("https://wa.me/254701777888")}
          >
            0701 777 888 (WhatsApp)
          </Text>
        );
      }

      if (part.match(/\(?\+?254\)?\s?0725\s?650\s?737/)) {
        return (
          <Text
            key={index}
            style={{ color: "#7F00FF" }}
            onPress={() => Linking.openURL("tel:+254725650737")}
          >
            0725 650 737 (Call)
          </Text>
        );
      }

      if (part.includes("nairobichapel.net")) {
        return (
          <Text
            key={index}
            style={{ color: "#7F00FF" }}
            onPress={() => Linking.openURL("https://nairobichapel.net")}
          >
            nairobichapel.net
          </Text>
        );
      }

      return <Text key={index}>{part}</Text>;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.messageContainer,
              msg.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.sender === "user" ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text style={styles.messageText}>
                {msg.sender === "bot"
                  ? renderFormattedMessage(msg.text)
                  : msg.text}
              </Text>
            </View>
          </View>
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#6A5ACD" />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask here..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          editable={!loading}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, loading && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={loading}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: "80%",
  },
  userMessage: { alignSelf: "flex-end" },
  botMessage: { alignSelf: "flex-start" },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  userBubble: { backgroundColor: "#e3f2fd" },
  botBubble: { backgroundColor: "#f5f5f5" },
  messageText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 20,
    flexWrap: "wrap",
  },
  loadingContainer: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#6A5ACD",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
});

export default ChatBox;
