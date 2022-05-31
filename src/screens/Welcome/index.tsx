import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { RootStackParamList } from '../../@types/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function Welcome({ navigation }: NativeStackScreenProps<RootStackParamList>) {

  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/img/logo.png')}
          style={{ width: '80%' }}
          resizeMode="contain"
        />
      </View>

      <Animatable.View delay={500} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>O mais novo aplicativo de matchmaking para seus jogos favoritos!</Text>
        <Text style={styles.text}>Faça o login para começar a jogar!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Acessar</Text>
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
  containerLogo: {
    flex: 2,
    backgroundColor: '#38a69d',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 28,
    marginBottom: 12
  },
  text: {
    color: '#a1a1a1',
    alignSelf: 'center'
  },
  button: {
    position: 'absolute',
    backgroundColor: '#38a69d',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 50,
    widht: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  }
})