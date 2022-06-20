import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function Home() {
  return (
    <View style={ styles.homeContainer }>
      <Animatable.View animation="fadeInDown" style={ styles.homeContainer }>
        <Text style={ styles.text }>Home</Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
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