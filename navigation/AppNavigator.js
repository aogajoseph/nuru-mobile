import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NoticesScreen from '../screens/NoticesScreen';
import SermonsScreen from '../screens/SermonsScreen';
import MinistriesScreen from '../screens/MinistriesScreen';
import EventsScreen from '../screens/EventsScreen';
import ConnectScreen from '../screens/ConnectScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#7F00FF',       // ✅ Your brand color for active tab
        tabBarInactiveTintColor: '#999',
        headerShown: false, // Keep this false, use Header inside screens
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
