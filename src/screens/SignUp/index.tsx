import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../@types/routes';

import SignUpForm from '../../components/SignUpForm';

export default function SignUp({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  return (
    <View style={styles.container}>
      <SignUpForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: '20px'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});