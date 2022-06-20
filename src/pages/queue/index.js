import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function Queue() {
  return (
    <View style={ styles.queueContainer }>
      <Animatable.View animation="fadeInUp" style={ styles.queueContainer }>
        <Text style={ styles.text }>Queue</Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  queueContainer: {
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
