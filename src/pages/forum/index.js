import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function Forum() {
  return (
    <View style={ styles.forumContainer }>
    <Animatable.View animation="fadeInLeft" style={ styles.forumContainer }>
      <Text style={ styles.text }>Forum</Text>
    </Animatable.View>
  </View>
  );
}

const styles = StyleSheet.create({
  forumContainer: {
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
