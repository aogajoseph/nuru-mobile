import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MinistriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ministries Screen</Text>
      <Text style={styles.subtitle}>Get involved in our community</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
}); 