import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { RootStackParamList } from '../../@types/routes';
import useSession from '../../hooks/useSession';
import { LoginDto } from '../../schemas/session';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function SignIn({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const session = useSession();

  const onSubmit = useCallback(async (values: LoginDto, helpers: FormikHelpers<LoginDto>) => {
    try {
      await session.login(values);
      navigation.navigate('App');
    } catch (error: any) {
      helpers.setFieldError('password', error.response.data.message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Tela de Login</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Formik<LoginDto>
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}
          validationSchema={SignInSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>
              <Text style={styles.title}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                keyboardType='email-address'
                autoCapitalize='none'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <Text style={styles.textError}>{errors.email || ''}</Text>

              <Text style={styles.title}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                secureTextEntry={true}
                autoCapitalize='none'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <Text style={styles.textError}>{errors.password || ''}</Text>

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Acessar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text
            style={styles.registerText}
          >
            Não possui uma conta?
            <Text style={styles.signUpText} onPress={() => navigation.navigate('SignUp')}> Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d'
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '28%'
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
  signUpText: {
    color: '#38a69d',
    fontWeight: 'bold',
  },
  textError: {
    color: '#FF0000',
    fontSize: 12,
  }
})
