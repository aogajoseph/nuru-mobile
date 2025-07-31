import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const cardStyles = [
  {
    colors: ['#f3e7ff', '#e3f0ff'],
    borderColor: '#d1b3ff',
  },
  {
    colors: ['#e3f0ff', '#f3e7ff'],
    borderColor: '#b3d1ff',
  },
  {
    colors: ['#fffbe7', '#e7fff3'],
    borderColor: '#ffe7b3',
  },
  {
    colors: ['#e7fff3', '#fffbe7'],
    borderColor: '#b3ffe7',
  },
];

export default function NoticesCard({ title, subtitle, description, category, buttonLabel, idx, onPress }) {
  const style = cardStyles[idx % cardStyles.length];
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={style.colors}
        style={[styles.card, { borderColor: style.borderColor }]}
      >
        <View style={styles.content}>
          {category && (
            <Text style={styles.category}>{category}</Text>
          )}
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
          <Text style={styles.description}>{description}</Text>
        </View>
        {buttonLabel && (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 260,
    maxWidth: 340,
    flex: 1,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  content: {
    padding: 16,
  },
  category: {
    color: '#7F00FF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    color: '#666',
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '400',
  },
  description: {
    fontSize: 13,
    color: '#444',
    marginBottom: 12,
    lineHeight: 18,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: -8,
  },
  buttonText: {
    fontSize: 12,
    color: '#7F00FF',
    fontWeight: '500',
  },
}); 