import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { AppStackParamList, RootStackParamList } from "../../@types/routes";

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import { QueueService } from "../../services/QueueService";

import UserService from "../../services/UserService";
import useApp from "../../hooks/useApp";
import { useNavigation } from "@react-navigation/native";

import { io } from "socket.io-client";

const queueService = new QueueService();
const socket = io('https://queuepds.herokuapp.com/')

export default function Queue({ route }: NativeStackScreenProps<AppStackParamList, 'Queue'>) {
  
  const [userInQueue, setUserInQueue] = useState(false);
  async function joinQueue(id){
    const player = await UserService.getUserById(id)

    socket.emit('joinRoom', {username: player.username, Room: 'League', numberPlayers:2});
    socket.on('League2', (message) => console.log(message))

    // await queueService.joinQueue(id).then((response) => {
    //   console.log(response);
      setUserInQueue(true);
    //   setPlayers([account])
      alert('Partida encontrada')
  
  }


  async function leaveQueue(id:any){
    await queueService.leaveQueue(id).then((response) => {
      console.log(response);
      setUserInQueue(response);
      setPlayers([])
    }
    );
  }
    const { account } = useApp();
    const [openGame, setOpenGame] = useState(false);
    const [valueGame, setValueGame] = useState(null);
    const [itemsGame, setItemsGame] = useState([
      {label: 'League of Legends', value: 'lol'},
      {label: 'Valorant', value: 'valorant'}
    ]);

    const [openMode, setOpenMode] = useState(false);
    const [valueMode, setValueMode] = useState(null);
    const [itemsMode, setItemsMode] = useState([
        {label: 'Duos', value: 'duos'},
        {label: 'Squads', value: 'squads'}
    ]);

    const [players, setPlayers] = useState([]);

    
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
  return (
    <View style={styles.container}> 

        {!userInQueue ? 
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdown1}>

            <DropDownPicker
              placeholder="Escolha um jogo"
              open={openGame}
              value={valueGame}
              items={itemsGame}
              setOpen={setOpenGame}
              setValue={setValueGame}
              setItems={setItemsGame} />
          </View><View style={styles.dropdown2}>
              <DropDownPicker
                placeholder="Escolha um modo"
                open={openMode}
                value={valueMode}
                items={itemsMode}
                setOpen={setOpenMode}
                setValue={setValueMode}
                setItems={setItemsMode} />
            </View>
          </View> : <View></View>}


        <View style={ userInQueue ? styles.leave : styles.find }>
          {userInQueue ?
          <View>
            <TouchableOpacity onPress={() => leaveQueue(account.id)}><Text>Sair</Text></TouchableOpacity> 
          </View> 
          : 
          <View>
            <TouchableOpacity onPress={() => joinQueue(account.id)}><Text>Buscar</Text></TouchableOpacity> 
          </View>  
          }
        </View>

      <View>
        {userInQueue && !players? <View>
          <Text> Buscando Jogadores </Text>
          <ActivityIndicator  animating={true} ></ActivityIndicator> 

        </View>
        : 
        <View>
          {/* <Text> Partida Encontrada </Text> */}
          <ActivityIndicator animating={false}></ActivityIndicator>
        </View>
        }
      </View>


      <View>
      {players && players.map((user, i) => 
        <TouchableOpacity key={i} style={ styles.friendsButton } onPress={()=>{navigation.push('App', { screen: 'Profile', params: { user: user } })}}>

          <View style={ styles.friendsButtonContent }>
          <View style={styles.avatarContainer}>
            <View>
              <Image style={styles.avatar} source={require('../../assets/img/user.jpg')} />
            </View>
          </View>
          <View style={styles.friendsButtonText}>
            <Text style={ styles.text }>{user.username}</Text>
            <Text style={ styles.bottomText }>{user.email}</Text>
            <Text style={ styles.bottomText }>{user.bio}</Text>
          </View>
          </View>
        </TouchableOpacity>)}
    </View>
    </View>
  );

  
};

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      flexDirection: 'column',
    },
    dropdown1:{
        width: '100%',
        height: 50,
        backgroundColor: '#38a69d',
        borderRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        zIndex: 2,
    },
    dropdown2:{
      width: '100%',
      height: 50,
      backgroundColor: '#38a69d',
      borderRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%',
      marginTop: 30,
      display: 'flex',
      flexDirection: 'row',
      zIndex: 1,
  },
    dropdownContainer:{
        width: '70%',

    },
    find:{
        width: '70%',
        height: 50,
        backgroundColor: '#38a69d',
        borderRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leave:{
      backgroundColor: '#F00',
      width: '70%',
      height: 50,
  
      borderRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%',
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },



    friendsButton : {
      flex: 1,
      backgroundColor: '#DDD',
      width: '100%',
      maxHeight: 60,
      minHeight: 60,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 5,
    },
    friendsButtonContent : {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
    },
    avatar: {
      height: 60,
      width: 60,
      backgroundColor: 'black',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderColor: '#38a69d',
      borderWidth: 1,
    },
    avatarContainer: {
      height: '100%',
    
      alignSelf: 'center',
    },
    text : {
      fontSize: 16,
      fontWeight: 'bold',
      
    },
    bottomText : {
      fontSize: 12,
      
    },
    friendsButtonText : {
      flex: 1,
      flexDirection: 'column',
      width: '85%',
      justifyContent: 'flex-start',
      paddingLeft: 10,
    },




  });