import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const frontlineMinistries = [
  {
    title: "Echo Africa",
    subheader: "Mission Outreach",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Transforming lives across Africa through missions, education, and empowerment.",
    details: "Echo Africa partners with local churches and organizations to bring hope and resources to underserved communities.",
  },
  {
    title: "One Lamb",
    subheader: "Ending child exploitation",
    image: "https://onelamb.org/wp-content/uploads/2016/08/Main-Cover-Photo.jpg",
    description: "Works with communities to end child sexual exploitation through the gospel.",
    details: "One Lamb began in 2011 after a documentary on human trafficking. It addresses child exploitation in Kenya through rescue and gospel-centered restoration.",
  },
  {
    title: "Safe Families",
    subheader: "Foster Care",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "Extends love and support to vulnerable families and children.",
    details: "Safe Families places children in temporary homes while helping parents overcome crises such as illness or job loss. It revives the African communal care spirit.",
  },
  {
    title: "Tumaini Clinics",
    subheader: "Health & Wellness",
    image: "https://your-cdn.com/tumainiClinics.png",
    description: "Affordable, quality medical services in Kibra and Korogocho.",
    details: "With over 3,500 patients monthly, Tumaini Clinics offer maternity and general care at a fraction of market cost, making healthcare accessible to the underserved.",
  },
];

const otherMinistries = [
  {
    title: "Quest",
    subheader: "Ages 3–12",
    image: "https://nairobichapel.net/wp-content/uploads/2015/07/NY1A1171-1024x683.jpg",
    description: "Helping children know God and grow in His Word.",
    details: "QUEST is a fun and Christ-centered environment where children build faith foundations and are empowered to love others through biblical adventure.",
  },
  {
    title: "Teens Church",
    subheader: "Ages 13–19",
    image: "https://nairobichapel.net/wp-content/uploads/2015/07/youth-church.png",
    description: "Nurturing and empowering young adults.",
    details: "Also known as XP, this dynamic youth program equips teens for spiritual, emotional, and leadership growth while encouraging real community.",
  },
  {
    title: "Plug-In",
    subheader: "Finding Purpose",
    image: "https://nairobichapel.net/wp-content/uploads/2015/07/plug-in.png",
    description: "A 10-week discipleship journey for discovering God's purpose.",
    details: "Plug-In is an immersive experience into God’s Word, correcting false views of Him and creating lasting friendships rooted in Christ-centered community.",
  },
  {
    title: "E-Groups",
    subheader: "Fishers of Men",
    image: "https://nairobichapel.net/wp-content/uploads/2018/03/egroups-1.jpg",
    description: "Building authentic relationships and growing spiritually.",
    details: "eGroups meet weekly to foster Accountability, Belonging, Care, Discipleship, and Evangelism. This is where the true church life happens.",
  },
  {
    title: "Jabari",
    subheader: "Men's Ministry",
    image: "https://your-cdn.com/jabari.png",
    description: "Empowering men to be bold disciples of Jesus.",
    details: "Jabari connects men to God and each other to live out their faith at home, church, and society with strength and purpose.",
  },
  {
    title: "Binti",
    subheader: "Women's Ministry",
    image: "https://your-cdn.com/binti.png",
    description: "Encouraging women to embrace identity and faith.",
    details: "Binti fosters prayer, community, and strength among women from all walks of life, equipping them to respond to life with grace and spiritual depth.",
  },
  {
    title: "T-Track",
    subheader: "Discipleship",
    image: "https://nairobichapel.net/wp-content/uploads/2018/02/NC-T-Track-edited.png",
    description: "Guiding believers through spiritual maturity.",
    details: "T-Track includes REACH, CONNECT, and GROW — stages that help people engage with faith, grow spiritually, and make disciples.",
  },
];

const MinistryCard = ({ title, subheader, image, description, details }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubheader}>{subheader}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        {expanded && <Text style={styles.cardDetails}>{details}</Text>}
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.toggleText}>
            {expanded ? 'Show less' : 'Show more'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function MinistriesScreen() {
  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Ministries</Text>
          <Text style={styles.pageSubtitle}>
            Explore our various ministries and find your place to serve, grow and connect.
          </Text>
        </View>

        {/* Frontline Ministries */}
        <Text style={styles.sectionHeading}>Frontline Ministries</Text>
        <View style={styles.cardsWrapper}>
          {frontlineMinistries.map((ministry, idx) => (
            <MinistryCard key={idx} {...ministry} />
          ))}
        </View>

        {/* Other Ministries */}
        <Text style={styles.sectionHeading}>Other Ministries</Text>
        <View style={styles.cardsWrapper}>
          {otherMinistries.map((ministry, idx) => (
            <MinistryCard key={idx} {...ministry} />
          ))}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 32,
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
  cardsWrapper: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 18,
  },
  image: {
    width: '100%',
    height: 180,
  },
  textWrapper: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  cardSubheader: {
    fontSize: 13,
    fontWeight: '500',
    color: '#7F00FF',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
    marginBottom: 8,
  },
  toggleText: {
    fontSize: 13,
    color: '#7F00FF',
    fontWeight: '500',
  },
});
