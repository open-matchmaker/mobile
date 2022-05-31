import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

import instance from '../services/api';

async function submitButton(username: string, email: string, password: string) {
  const response = await instance.post('/user', { username, email, password })

  console.log(response.data);
}

const SignUpForm = () => {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.form}>
        <View style={styles.upperContainer}>
          <TextInput style={styles.input} onChangeText={onChangeName} value={name} placeholder='Digite seu Nome' />
        </View>
        <View style={styles.middleContainer}>
          <TextInput style={styles.input2} onChangeText={onChangeEmail} value={email} placeholder='Digite seu email' />
          <TextInput style={styles.input2} secureTextEntry={true} passwordRules="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChangeText={onChangePassword} value={password} placeholder='Digite sua senha' />
        </View>
        <Button
          onPress={() => { submitButton(name, email, password) }}
          title="Enviar"
          color="orange"
          accessibilityLabel="Enviar"
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    minHeight: '70%',
    alignSelf: 'center',
    marginTop: 50,
  },
  form: {
    display: 'flex',
    minWidth: '80%',
    boxColor: 'red',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    elevation: 4,

  },
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'orange',
    flex: 1,
    minWidth: '25%',
  },

  input2: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'orange',
    alignSelf: 'center',
    flex: 1,
    minWidth: 235,
  },
});

export default SignUpForm;