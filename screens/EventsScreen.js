import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const cardStyles = [
  {
    backgroundColor: '#e3f0ff',
    borderColor: '#b3d1ff',
  },
  {
    backgroundColor: '#fffbe7',
    borderColor: '#ffe7b3',
  },
  {
    backgroundColor: '#f3e7ff',
    borderColor: '#d1b3ff',
  },
  {
    backgroundColor: '#e7fff3',
    borderColor: '#b3ffe7',
  },
];

const upcomingEvents = [
  {
    title: "Annual Youth Camp",
    subtitle: "Mt. Kenya Forest",
    image: "https://nairobichapel.net/wp-content/uploads/2016/01/win1.jpg",
    date: "Aug 12-16, 2024",
    description: "A week of adventure, worship, and friendship in the wild! Register now for an unforgettable experience.",
  },
  {
    title: "Charity Fundraiser Dinner",
    subtitle: "Nairobi Serena Hotel",
    image: "https://nairobichapel.net/wp-content/uploads/2015/07/XP-DICE-Dance-group-1.png",
    date: "Sep 7, 2024",
    description: "Join us for an elegant evening to support our community outreach programs. Tickets available online.",
  },
];

const pastEvents = [
  {
    title: "Family Fun Day & Picnic",
    subtitle: "Uhuru Gardens",
    image: "https://nairobichapel.net/wp-content/uploads/2015/07/image8.jpg",
    date: "May 18, 2024",
    description: "Games, food, and fun for all ages! Thank you for making it a memorable day.",
  },
  {
    title: "Men’s Football Tournament",
    subtitle: "Nairobi Sports Grounds",
    image: "https://nairobichapel.net/wp-content/uploads/2015/07/Chapel-2006-1024x683.jpg",
    date: "Apr 13, 2024",
    description: "Congratulations to all teams for great sportsmanship and fellowship!",
  },
  {
    title: "Ladies’ Hiking Retreat",
    subtitle: "Ngong Hills",
    image: "https://nairobichapel.net/wp-content/uploads/2015/07/Chapel-2015-1024x683.jpg",
    date: "Mar 2, 2024",
    description: "A day of adventure, prayer, and connection in nature.",
  },
  {
    title: "Teens’ Movie Night",
    subtitle: "Chapel Hall",
    image: "https://nairobichapel.net/wp-content/uploads/2015/07/egroup2.png",
    date: "Feb 10, 2024",
    description: "A fun night of movies, snacks, and new friendships!",
  },
];

const EventsCard = ({ title, subtitle, image, date, description, idx }) => {
  const styleSet = cardStyles[idx % cardStyles.length];
  return (
    <View style={[styles.card, { backgroundColor: styleSet.backgroundColor, borderColor: styleSet.borderColor }]}>
      {image && (
        <Image source={{ uri: image }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
        {date && <Text style={styles.cardDate}>{date}</Text>}
        {description && <Text style={styles.cardDescription}>{description}</Text>}
      </View>
    </View>
  );
};

const EventsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Events</Text>
        <Text style={styles.pageSubtitle}>
          Explore our memorable encounters — camps, fundraisers, tournaments and more.
        </Text>
      </View>

      {/* Upcoming Events */}
      <Text style={styles.sectionHeading}>Upcoming Events</Text>
      {upcomingEvents.length === 0 ? (
        <Text style={styles.emptyText}>Nothing at the moment</Text>
      ) : (
        <View style={styles.cardsGrid}>
          {upcomingEvents.map((event, idx) => (
            <EventsCard key={idx} {...event} idx={idx} />
          ))}
        </View>
      )}

      {/* Past Events */}
      <Text style={styles.sectionHeading}>Past Events</Text>
      {pastEvents.length === 0 ? (
        <Text style={styles.emptyText}>Nothing at the moment</Text>
      ) : (
        <View style={styles.cardsGrid}>
          {pastEvents.map((event, idx) => (
            <EventsCard key={idx + 10} {...event} idx={idx + 10} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default EventsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'flex-start',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7F00FF',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  cardsGrid: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1.5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});
