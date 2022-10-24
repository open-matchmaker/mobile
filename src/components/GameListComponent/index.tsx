import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { RootStackParamList } from '../../@types/routes';

import { Game } from '../../schemas/game';
import GameService from '../../services/GameService';

export default function GameListComponent() {

    const[text, setText] = useState('');
    const[suggestions, setSuggestions] = useState([]);

    async function getGameSearch(text: string) {
        const response = await GameService.getGameByName(text);
        text.length > 0 ? setSuggestions(response.data) : setSuggestions([]);
        return response.data;
    }

    const onChangeText = useCallback((text: string) => {
        let matches;
        setText(text);
        getGameSearch(text);
    }
    , []);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View>
        <View style={styles.games}>
                <Text style={styles.text}>Jogos</Text>
                <TextInput onChangeText={onChangeText} placeholder="Digite o nome do jogo"/>
                {suggestions && suggestions.map((game, i) => 
                
                <View key={i} style={styles.game}>
                <Text 
                onPress={()=>{navigation.push('App', { screen: 'GameScreen', params: { game: game } })}}
                >{game.name}</Text>
                </View>)}
            </View>
        </View>
        

    );
    
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
    
        }, 
        text: {
            fontSize: 20,	
            fontWeight: "bold",
            color: "#000",
            marginBottom: 10,
        },
        editContainer: {
            width: "100%",
            padding: 10,
            backgroundColor: "#fff",
            height: "100%",
            alignContent: "center",
        },
        games: {
            flexDirection: "column",
        },
        game: {
            flexDirection: "row",
            marginBottom: 10,
            padding: 10,
            elevation: 3,
            borderRadius: 3,
            
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
    
    });
     