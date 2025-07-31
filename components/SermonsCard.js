import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView as WebViewComponent } from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;
const cardWidth = Math.min(screenWidth - 32, 340); // leave horizontal margins

export default function SermonsCard({ title, videoUrl, description, preacher, date, idx }) {
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

  const style = cardStyles[idx % cardStyles.length];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={style.colors}
        style={[styles.card, { borderColor: style.borderColor, width: cardWidth }]}
      >
        <View style={styles.content}>
          <Text style={styles.category}>Sermon</Text>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          {preacher && <Text style={styles.meta}>By {preacher}</Text>}
          {date && <Text style={styles.meta}>{date}</Text>}

          <View style={styles.videoContainer}>
            {Platform.OS === 'web' ? (
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: 8 }}
              />
            ) : (
              <WebViewComponent
                style={{ flex: 1 }}
                source={{ uri: videoUrl }}
                javaScriptEnabled
                domStorageEnabled
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 16, // Adds spacing from device edges
  },
  card: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  content: {
    width: '100%',
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
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
    lineHeight: 20,
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 12,
    backgroundColor: '#000',
  },
});
