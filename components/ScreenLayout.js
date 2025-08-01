// components/ScreenLayout.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';

export default function ScreenLayout({ children, hideHeader = false }) {
  return (
    <View style={styles.container}>
      {!hideHeader && <Header />}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});
