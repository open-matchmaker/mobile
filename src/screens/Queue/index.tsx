import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { AppStackParamList } from "../../@types/routes";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


export default function Queue({ route }: NativeStackScreenProps<AppStackParamList, 'Queue'>) {
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

        <View style={styles.dropdown}>

            <DropDownPicker 
                placeholder="Escolha um jogo"
                open={openGame}
                value={valueGame}
                items={itemsGame}
                setOpen={setOpenGame}
                setValue={setValueGame}
                setItems={setItemsGame}
            />
        </View>

        <View style={styles.dropdown}>
            <DropDownPicker
                placeholder="Escolha um modo"
                open={openMode}
                value={valueMode}
                items={itemsMode}
                setOpen={setOpenMode}
                setValue={setValueMode}
                setItems={setItemsMode}
            />
        </View>

        <View style={styles.find}>
            <TouchableOpacity><Text>Buscar</Text></TouchableOpacity>
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
    }
  });