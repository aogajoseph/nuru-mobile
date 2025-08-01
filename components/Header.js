import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  Linking,
  Dimensions,
  findNodeHandle,
  UIManager,
} from 'react-native';
import { Ionicons, FontAwesome, Feather, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo.png';

const { width } = Dimensions.get('window');

export default function Header() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = useRef(null);
  const [avatarPosition, setAvatarPosition] = useState({ top: 70, right: 16 });

  const toggleDropdown = () => {
    if (!showDropdown && avatarRef.current) {
      UIManager.measure(
        findNodeHandle(avatarRef.current),
        (_, __, ___, ____, pageX, pageY) => {
          setAvatarPosition({ top: pageY + 40, right: width - pageX - 32 });
        }
      );
    }
    setShowDropdown(!showDropdown);
  };

  const shareLinks = [
    {
      icon: <FontAwesome name="whatsapp" size={28} color="#25D366" />,
      url: 'https://wa.me/?text=Check%20out%20this%20awesome%20app!',
    },
    {
      icon: <FontAwesome name="facebook" size={28} color="#4267B2" />,
      url: 'https://www.facebook.com/sharer/sharer.php?u=https://example.com',
    },
    {
      icon: <Entypo name="twitter" size={28} color="#1DA1F2" />,
      url: 'https://twitter.com/intent/tweet?text=Check%20out%20this%20app%20https://example.com',
    },
    {
      icon: <Feather name="mail" size={28} color="#007AFF" />,
      url: 'mailto:?subject=Check%20this%20out&body=Here%20is%20a%20link%20to%20the%20app...',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Dismiss dropdown when pressing outside */}
      {showDropdown && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setShowDropdown(false)}
        />
      )}

      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />

        <View style={styles.right}>
          {/* Share Button */}
          <TouchableOpacity onPress={() => setShowShareModal(true)} style={{ marginRight: 16 }}>
            <Ionicons name="share-social-outline" size={24} color="#333" />
          </TouchableOpacity>

          {/* Avatar */}
          <TouchableOpacity onPress={toggleDropdown}>
            <View style={styles.avatar} ref={avatarRef}>
              <Text style={styles.avatarText}>NC</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Card */}
      {showDropdown && (
        <View
          style={[
            styles.dropdownWrapper,
            { top: avatarPosition.top, right: avatarPosition.right },
          ]}
        >
          {/* Tail */}
          <View style={styles.tail} />

          {/* Card */}
          <View style={styles.dropdownCard}>
            <Text style={styles.dropdownTitle}>Nairobi Chapel</Text>
            <Text style={styles.dropdownSubtitle}>Ngong' Road</Text>
            <TouchableOpacity onPress={() => alert('Admins only')}>
              <Text style={styles.settingsLink}>Settings (Admins Only)</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Share Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={showShareModal}
        onRequestClose={() => setShowShareModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowShareModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Share</Text>
            <View style={styles.iconRow}>
              {shareLinks.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.iconButton}
                  onPress={() => Linking.openURL(item.url)}
                >
                  {item.icon}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    zIndex: 10,
  },
  logo: {
    width: 110,
    height: 30,
    resizeMode: 'contain',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7F00FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dropdownWrapper: {
    position: 'absolute',
    zIndex: 20,
    alignItems: 'flex-end',
  },
  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    marginRight: 12,
    marginBottom: -1,
    elevation: 3,
  },
  dropdownCard: {
    backgroundColor: '#fff',
    padding: 16,
    width: 220,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  dropdownSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  settingsLink: {
    fontSize: 14,
    color: '#7F00FF',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: 280,
    elevation: 6,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  iconButton: {
    padding: 12,
  },
});
