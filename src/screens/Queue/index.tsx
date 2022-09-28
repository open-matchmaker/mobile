import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { AppStackParamList } from "../../@types/routes";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import { QueueService } from "../../services/QueueService";

import UserService from "../../services/UserService";
import useApp from "../../hooks/useApp";



const queueService = new QueueService();
export default function Queue({ route }: NativeStackScreenProps<AppStackParamList, 'Queue'>) {
  const [userInQueue, setUserInQueue] = useState(false);
  
  async function joinQueue(id){
    await queueService.joinQueue(id).then((response) => {
      console.log(response);
      setUserInQueue(response);
    }
  
    );
    
  }
  async function leaveQueue(id){
    await queueService.leaveQueue(id).then((response) => {
      console.log(response);
      setUserInQueue(response);
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

  return (
    <View style={styles.container}> 
      <Text>Queue</Text>

        {!userInQueue ? 
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdown}>

            <DropDownPicker
              placeholder="Escolha um jogo"
              open={openGame}
              value={valueGame}
              items={itemsGame}
              setOpen={setOpenGame}
              setValue={setValueGame}
              setItems={setItemsGame} />
          </View><View style={styles.dropdown}>
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


<View style={styles.find}>
          {userInQueue ? <TouchableOpacity style={styles.leave} onPress={() => leaveQueue(account.id)}><Text>Sair</Text></TouchableOpacity> : <TouchableOpacity  onPress={() => joinQueue(account.id)}><Text>Buscar</Text></TouchableOpacity>}
        </View>

    </View>
  );

  
};

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#38a69d',
      alignItems: 'center',
      flexDirection: 'column',
    },
    dropdown:{
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
    },
    dropdownContainer:{
        width: '100%',

    },
    find:{
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leave:{
      backgroundColor: '#F00',
      width: '100%',
      height: 50,
  
      borderRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%',
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });