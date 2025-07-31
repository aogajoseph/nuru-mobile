// File: screens/SermonsScreen.js
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import SermonsCard from '../components/SermonsCard';

const sermons = [
  {
    title: "The Commission",
    videoUrl: "https://www.youtube.com/embed/idCfP_ScsLc?si=EUAMYqfLOvZSPFvA",
    description: "If Jesus was to establish a government today, what would it look like? Think about that.",
    preacher: "Pastor Cosma Gatere",
    date: "Jul 27, 2025",
  },
  {
    title: "The Connections",
    videoUrl: "https://www.youtube.com/embed/QApLqL1rx8Q?si=S0Leaxk05g6l8Bfq",
    description: "The connections of Kingdom citizens and how they impact the world.",
    preacher: "Pastor Cosma Gatere",
    date: "Jul 20, 2025",
  },
  {
    title: "The Culture",
    videoUrl: "https://www.youtube.com/embed/BrDfdG8mg3c",
    description: "What habits, practices and cultures are you passing on to the next generation?",
    preacher: "Pastor Cosma Gatere",
    date: "Jul 13, 2025",
  },
  {
    title: "The Calling",
    videoUrl: "https://www.youtube.com/embed/yGcXBVDGp2w",
    description: "The calling of Jesus Christ to humanity was purposely to teach about the Kingdom of God.",
    preacher: "Pastor Cosma Gatere",
    date: "Jul 6, 2025",
  },
  {
    title: "Silent Prayer",
    videoUrl: "https://www.youtube.com/embed/FIhAwgtQ7-Q",
    description: "Discover the power of connecting silently with our heavenly father.",
    preacher: "Bishop Oscar Muriu",
    date: "Jun 22, 2025",
  },
  {
    title: "Prayer Rhythms",
    videoUrl: "https://www.youtube.com/embed/ZEudbr1KVOc",
    description: "Discover the daily Prayer Rhythms that anchor your faith and nourish your spirit.",
    preacher: "Bishop Oscar Muriu",
    date: "Jul 15, 2025",
  },
];

const SermonsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Sermons</Text>
      <Text style={styles.subtitle}>
        Our messages are crafted to encourage, challenge and deepen your walk with Christ.
      </Text>

      {sermons.length === 0 ? (
        <Text style={styles.empty}>Nothing at the moment</Text>
      ) : (
        sermons.map((sermon, idx) => (
          <SermonsCard key={idx} {...sermon} idx={idx} />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  empty: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default SermonsScreen;
