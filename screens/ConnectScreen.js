import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Linking,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesome, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import ScreenLayout from '../components/ScreenLayout';

const ConnectScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [donationMethod, setDonationMethod] = useState('mpesa');
  const [amount, setAmount] = useState('');

  return (
    <ScreenLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Connect</Text>
          <Text style={styles.pageSubtitle}>
            Get involved by sharing feedback, giving or connecting with us online or in person.
          </Text>
        </View>

        <View style={[styles.card, styles.feedbackCard]}>
          <Text style={styles.heading}>Feedback</Text>
          <Text style={styles.subtext}>
            Your feedback is anonymous. If you'd like a response, include your phone number or email.
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Type here..."
            placeholderTextColor="#888"
            value={feedback}
            onChangeText={setFeedback}
            style={styles.inputArea}
          />
          <Button title="Send" onPress={() => {}} color="#7F00FF" />
        </View>

        <View style={[styles.card, styles.givingCard]}>
          <Text style={styles.subheading}>Giving</Text>
          <Text style={styles.label}>Method</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.methodButton, donationMethod === 'mpesa' && styles.activeMethod]}
              onPress={() => setDonationMethod('mpesa')}
            >
              <MaterialIcons name="phone-android" size={16} />
              <Text style={styles.methodText}>Mpesa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.methodButton, donationMethod === 'credit' && styles.activeMethod]}
              onPress={() => setDonationMethod('credit')}
            >
              <Entypo name="credit-card" size={16} />
              <Text style={styles.methodText}>Credit</Text>
            </TouchableOpacity>
          </View>

          {donationMethod === 'mpesa' && (
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#888"
              style={styles.input}
              keyboardType="phone-pad"
            />
          )}

          {donationMethod === 'credit' && (
            <>
              <TextInput
                placeholder="Card Number"
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="numeric"
              />
              <View style={styles.rowInput}>
                <TextInput
                  placeholder="Expiry"
                  placeholderTextColor="#888"
                  style={[styles.input, { flex: 1 }]}
                />
                <TextInput
                  placeholder="CVV"
                  placeholderTextColor="#888"
                  style={[styles.input, { flex: 1 }]}
                />
              </View>
              <TextInput
                placeholder="Name on Card"
                placeholderTextColor="#888"
                style={styles.input}
              />
            </>
          )}

          <TextInput
            placeholder="Amount (KES)"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Button title="Give" onPress={() => {}} color="#7F00FF" />
        </View>

        <Text style={styles.sectionTitle}>Stay Connected</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/NairobiChapel/')}>
            <FontAwesome name="facebook" size={26} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/254701777888')}>
            <FontAwesome name="whatsapp" size={26} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/channel/UCHFRjuT0oBt6l1vsVnldBJw')}>
            <FontAwesome name="youtube-play" size={26} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+254725650737')}>
            <Feather name="phone" size={26} color="#7F00FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:info@nairobichapel.org')}>
            <MaterialIcons name="email" size={26} color="#7F00FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.mapCard}>
          <Image source={require('../assets/images/location.png')} style={styles.map} resizeMode="cover" />
          <TouchableOpacity
            onPress={() => Linking.openURL('https://maps.app.goo.gl/sKFTCNgBzYaoujqN6/')}
            style={styles.openMapBtn}
          >
            <Text style={styles.openMapText}>Open in Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <Text style={styles.subheading}>Church Location</Text>
          <Text style={styles.addressText}>Jamuhuri Road off Ngong Road</Text>

          <Text style={styles.subheading}>Office Location</Text>
          <Text style={styles.addressText}>
            Greenhouse Building, Adams Arcade, Ngong Road. West Wing, First Floor (Suite 1)
          </Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default ConnectScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  pageHeader: { paddingTop: 30, paddingBottom: 16, paddingHorizontal: 16 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#333', marginBottom: 6 },
  pageSubtitle: { fontSize: 14, color: '#666', fontWeight: '400', lineHeight: 20 },
  card: { margin: 16, borderRadius: 10, padding: 16, backgroundColor: '#fff', elevation: 2 },
  feedbackCard: { backgroundColor: '#fffbe7', borderColor: '#ffe7b3', borderWidth: 1.5 },
  givingCard: { backgroundColor: '#f3e7ff', borderColor: '#d1b3ff', borderWidth: 1.5 },
  mapCard: { marginHorizontal: 16, marginBottom: 20, height: 220, borderRadius: 10, overflow: 'hidden' },
  map: { width: '100%', height: '100%' },
  openMapBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#7F00FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  openMapText: {
    color: '#fff',
    fontWeight: '600',
  },
  heading: { fontSize: 20, fontWeight: '700', color: '#7F00FF', marginBottom: 10 },
  subheading: { fontSize: 16, fontWeight: '600', color: '#7F00FF', marginBottom: 6 },
  subtext: { fontSize: 13, color: '#666', marginBottom: 12 },
  input: { backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  inputArea: { backgroundColor: '#fff', textAlignVertical: 'top', borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, height: 100, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginLeft: 16, textAlign: 'center', marginBottom: 14, color: '#333' },
  socialIcons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, paddingHorizontal: 16 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  methodButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', backgroundColor: '#f2f2f2' },
  activeMethod: { borderColor: '#7F00FF', backgroundColor: '#e8d6ff' },
  methodText: { marginLeft: 6, fontSize: 14 },
  rowInput: { flexDirection: 'row', gap: 8 },
  addressCard: { marginHorizontal: 16, marginBottom: 32 },
  label: { fontSize: 14, marginBottom: 6 },
  addressText: { fontSize: 14, color: '#555', marginBottom: 10 },
});
