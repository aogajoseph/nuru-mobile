import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ChatBox from '../components/ChatBox';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hi, My name is Nuru.</Text>
        <Text style={styles.subtitle}>
          Ask me anything about Nairobi Chapel Ngong' Road.
        </Text>
      </View>

      {/* Chat box */}
      <View style={styles.chatContainer}>
        <ChatBox />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
}); 