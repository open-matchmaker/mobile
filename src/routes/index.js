import React from 'react';
import { StyleSheet, StatusBar, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/home/';
import Profile from '../pages/profile/';
import Forum from '../pages/forum/';
import Queue from '../pages/queue';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: true,
      tabBarLabelPosition: 'beside-icon',
      headerShown: false,
      tabBarIconStyle: {display: 'none'},
      tabBarStyle: {
        position: 'absolute',
        bottom: 16,
        left: 15,
        right: 15,
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
        height: 90,
        ...styles.shadow,
      }
    }}>
      <Tab.Screen name="Forum" component={Forum} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Queue" component={Queue} />
      <Tab.Screen name="Profile" component={Profile} />
      
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#24272b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  
});