// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkIntro = async () => {
      console.log("[_layout] Starting intro check...");

      try {
        const seen = await AsyncStorage.getItem("seenIntro");
        console.log("[_layout] Intro seen status:", seen);

        if (seen !== "true") {
          console.log("[_layout] Scheduling redirect to /intro/slide1...");
          setTimeout(() => {
            try {
              router.replace("/intro/slide1");
              console.log("[_layout] Redirect triggered.");
            } catch (navErr) {
              console.error("[_layout] Navigation error:", navErr);
            }
          }, 50);
        }
      } catch (err) {
        console.error("[_layout] Error checking intro status:", err);
      } finally {
        if (isMounted) {
          console.log("[_layout] Setting loading to false.");
          setLoading(false);
        }
      }
    };

    checkIntro();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading initial route...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="intro/slide1" />
      <Stack.Screen name="intro/slide2" />
    </Stack>
  );
}
