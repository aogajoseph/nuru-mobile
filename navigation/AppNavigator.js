import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NoticesScreen from '../screens/NoticesScreen';
import SermonsScreen from '../screens/SermonsScreen';
import MinistriesScreen from '../screens/MinistriesScreen';
import EventsScreen from '../screens/EventsScreen';
import ConnectScreen from '../screens/ConnectScreen';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function CustomHeader() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' }}>
      {/* Logo */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>NURU</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Share icon */}
        <TouchableOpacity style={{ marginRight: 16 }}>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
        {/* Avatar */}
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>U</Text>
        </View>
      </View>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <CustomHeader />,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" size={size} color={color} />) }} />
      <Tab.Screen name="Notices" component={NoticesScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="notifications-outline" size={size} color={color} />) }} />
      <Tab.Screen name="Sermons" component={SermonsScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="book-outline" size={size} color={color} />) }} />
      <Tab.Screen name="Ministries" component={MinistriesScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="people-outline" size={size} color={color} />) }} />
      <Tab.Screen name="Events" component={EventsScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="calendar-outline" size={size} color={color} />) }} />
      <Tab.Screen name="Connect" component={ConnectScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />) }} />
    </Tab.Navigator>
  );
} 