import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ChatBox from '../components/ChatBox';
import ScreenLayout from '../components/ScreenLayout';

export default function HomeScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScreenLayout>
          <View style={styles.header}>
            <Text style={styles.title}>Ask Nuru.</Text>
            <Text style={styles.subtitle}>
              Your digital assistant at Nairobi Chapel Ngong Road
            </Text>
          </View>
          <View style={styles.chatContainer}>
            <ChatBox />
          </View>
        </ScreenLayout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
