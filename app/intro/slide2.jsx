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

const sectionPoints = [
  "📢 Notices – Stay updated with announcements and news.",
  "🎧 Sermons – Catch up on messages and teachings.",
  "🤝 Ministries – Discover places to serve and grow.",
  "📅 Events – Find out what’s happening and join in.",
  "💬 Connect – Reach out or get involved easily.",
];

export default function Slide2() {
  const [visibleCount, setVisibleCount] = useState(0);
  const fadeAnim = useRef([]).current;

  // Prepare animation refs
  if (fadeAnim.length === 0) {
    sectionPoints.forEach(() => fadeAnim.push(new Animated.Value(0)));
  }

  useEffect(() => {
    if (visibleCount < sectionPoints.length) {
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

  const handleDone = async () => {
    await AsyncStorage.setItem("seenIntro", "true");
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Title */}
      <Text style={styles.title}>There’s More to Explore</Text>
      <Text style={styles.subtitle}>
        Beyond chat, Nuru helps you navigate all of{"\n"}
        <Text style={{ fontWeight: "bold" }}>
          Nairobi Chapel Ngong Road.
        </Text>
      </Text>

      {/* Centered bullet list */}
      <View style={styles.bulletContainer}>
        <FlatList
          data={sectionPoints.slice(0, visibleCount)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Animated.View
              style={[styles.bulletRow, { opacity: fadeAnim[index] }]}
            >
              <Text style={styles.bullet}>{item}</Text>
            </Animated.View>
          )}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>

      {/* Buttons at bottom */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.outlinedButton}
          onPress={() => router.back()}
        >
          <Text style={styles.outlinedText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filledButton} onPress={handleDone}>
          <Text style={styles.filledText}>Let’s Go →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 24,
    justifyContent: "space-between", // match Slide 1 spacing
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7F00FF",
    marginTop: 180,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 32,
  },
  bulletContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 6,
    maxWidth: "90%",
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
    paddingBottom: 140, // same bottom padding as Slide 1
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
