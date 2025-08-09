import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const bulletPoints = [
  "I answer your questions about Nairobi Chapel Ngong Road.",
  "I help you find service times and get oriented confidently.",
  "I guide newcomers on what to expect during Sunday visits.",
  "I'm always respectful, friendly, and Scripture-conscious.",
  "I’m always available for you 24 hours a day, 7 days a week.",
];

export default function Slide1() {
  const [visibleCount, setVisibleCount] = useState(0);
  const fadeAnim = useRef([]).current; // store refs for each bullet animation

  // initialize animation values
  if (fadeAnim.length === 0) {
    bulletPoints.forEach(() => fadeAnim.push(new Animated.Value(0)));
  }

  useEffect(() => {
    if (visibleCount < bulletPoints.length) {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim[visibleCount], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
        setVisibleCount((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  const handleSkip = async () => {
    await AsyncStorage.setItem("seenIntro", "true");
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Hi, I’m Nuru.</Text>
        <Text style={styles.subtitle}>
          Your friendly digital companion at
          <Text style={{ fontWeight: "bold" }}> Nairobi {"\n"} Chapel Ngong Road.</Text>
        </Text>

        <View style={styles.bulletContainer}>
          <FlatList
            data={bulletPoints.slice(0, visibleCount)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Animated.View
                style={[styles.bulletRow, { opacity: fadeAnim[index] }]}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#7F00FF"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.bullet}>{item}</Text>
              </Animated.View>
            )}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.outlinedButton} onPress={handleSkip}>
            <Text style={styles.outlinedText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filledButton}
            onPress={() => router.push("/intro/slide2")}
          >
            <Text style={styles.filledText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center", // Center whole block vertically
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7F00FF",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  bulletContainer: {
    marginBottom: 40,
    alignItems: "center", // centers the whole bullet row
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 6,
    maxWidth: "90%", // keeps wrapped text aligned under the first line
  },
  bullet: {
    fontSize: 15,
    color: "#333",
    flexShrink: 1,
  },  
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 10,
  },
  outlinedButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#6A5ACD",
  },
  filledButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#6A5ACD",
  },
  outlinedText: {
    color: "#6A5ACD",
    fontWeight: "600",
  },
  filledText: {
    color: "white",
    fontWeight: "600",
  },
});
