import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useApp from "../../hooks/useApp";
import { Game } from "../../schemas/game";
import { User } from "../../schemas/user";
import GameService from "../../services/GameService";

interface Props {
    game: Game;
}

function addGame(gameId:number){
  console.log("add game", gameId);
  try {
    GameService.addGameToUser({id : gameId});
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
}

function removeGame(gameId:number){
    console.log("remove game", gameId);
    try {
        GameService.removeGameFromUser({id : gameId});
    } catch (error) {
        console.log(error);
    } finally {
        window.location.reload();
    }	
}
function generateButton(game:Game,user:User) {
    if(user.playsGames.some((games) => games.id === game.id)){
        return (
            <TouchableOpacity style={styles.buttonReject} onPress={()=>{removeGame(game.id)}}>
                <Text style={styles.buttonText}>Remover</Text>
            </TouchableOpacity>
        );
    }else{
        return (
            <TouchableOpacity style={styles.button} onPress={()=>{addGame(game.id)}}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
        );
    }
}


export default function gameOverview({ game }: Props) {
    const user = useApp().account;
    return (
        <View style={styles.container}>
        <Text>{game.name}</Text>
            {generateButton(game, user)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

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
        buttonReject: {
        backgroundColor: '#ff0000',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
        },

});