import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik';

import { SignUpDto } from '../../schemas/session';

import { RootStackParamList } from '../../@types/routes';

import instance  from '../../services/api'

import UserService from '../../services/UserService';



export default function SignUp({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const SignUpSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = useCallback(async (values: SignUpDto, helpers: FormikHelpers<SignUpDto>) => {
    try {

    const response = await UserService.create(values)
    navigation.navigate('SignIn')
    } catch (error: any) {
      alert(error + " ocorreu algum erro no cadastro, tente novamente mais tarde")
    }
  }, []);
 
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Tela de Cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInDown" style={styles.containerForm}>
      <Formik<SignUpDto>
        initialValues={{ username: '',email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={SignUpSchema}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Nome</Text>
            <TextInput style={styles.input}  
              placeholder='Digite seu nome'               
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')} />
            
            <Text style={styles.title}>E-mail</Text>
            <TextInput style={styles.input}
              placeholder='Digite seu e-mail'
              keyboardType='email-address'
              autoCapitalize='none'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')} />
            <Text style={styles.textError}>{errors.email || ''}</Text>

            <Text style={styles.title}>Senha</Text>
            <TextInput style={styles.input}
              placeholder='Digite sua senha' 
              secureTextEntry={true}                
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')} />
            <Text style={styles.textError}>{errors.password || ''}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        )}
        </Formik>
        <Text>{'\n'}</Text>
        <Text style={styles.signInText} onPress={() => navigation.goBack()}> Fazer Login</Text>
      </Animatable.View>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d'
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '28%',
  },
  formContainer: {
    marginTop: 28,
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 20,
    marginTop: 18
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText: {
    color: '#a1a1a1'
  },
  signInText: {
    color: '#38a69d',
    fontWeight: 'bold',
    alignSelf:'center'
  },
  textError: {
    color: '#FF0000',
    fontSize: 12,
  }
});

