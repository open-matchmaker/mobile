import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function Profile() {
  return (
    <View style={ styles.profileContainer }>
      <Animatable.View animation="fadeInRight" style={ styles.profileContainer }>
        <Text style={ styles.text }>Profile</Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38A69D'
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
})
