import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import NoticesCard from '../../components/NoticesCard';
import ScreenLayout from '../../components/ScreenLayout';

const notices = [
  {
    title: "Main Service",
    subtitle: "Every Sunday",
    description: "Join us in the Hyperdome (Main Tent) at 9:00am and 11:30am for worship and fellowship.",
    category: "Worship",
  },
  {
    title: "Children and Teens",
    subtitle: "Sunday Service",
    description: "All children and teens are welcome in the for Sunday School at 9:00am and 11:30am.",
    category: "Worship",
  },
  {
    title: "Young Adults",
    subtitle: "Sunday Service",
    description: "All young adults are warmly welcome in the XP tent for worship and fellowship at 11:30am",
    category: "Worship",
  },
  {
    title: "Prayer Meeting",
    subtitle: "Wednesdays",
    description: "Join us in the Hyperdome (Main tent) from 6.00pm to 7:30pm for prayers. All are invited.",
    category: "Prayer",
  },
  {
    title: "Weekly Prayer Meetings",
    subtitle: "Weekdays",
    description: "Join us from 5:00am to 6:00am on Zoom. Use the link below.",
    category: "Prayer",
    buttonLabel: "Zoom Link",
  },
];

export default function NoticesScreen() {
  const handleZoomLink = () => {
    Linking.openURL('https://zoom.us');
  };

  return (
    <ScreenLayout>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Notices</Text>
          <Text style={styles.subtitle}>
            Stay up to date with the latest church news and important announcements.
          </Text>
        </View>

        {/* Notices Cards */}
        <View style={styles.cardsContainer}>
          {notices.length === 0 ? (
            <Text style={styles.emptyText}>Nothing at the moment</Text>
          ) : (
            <View style={styles.cardsGrid}>
              {notices.map((notice, idx) => (
                <NoticesCard
                  key={idx}
                  {...notice}
                  idx={idx}
                  onPress={notice.buttonLabel === "Zoom Link" ? handleZoomLink : undefined}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12,
    color: '#666',
    lineHeight: 22,
    textAlign: 'left',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  cardsGrid: {
    gap: 16,
    alignItems: 'center',
    width: '100%',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
