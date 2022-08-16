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
  }
}

function removeGame(gameId:number){
    console.log("remove game", gameId);
    try {
        GameService.removeGameFromUser({id : gameId});
    } catch (error) {
        console.log(error);
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
            <View style={styles.form}>
            <View style={styles.formHeader}>
                <Text style={styles.title}>{game.name}</Text>
            </View>
            <View style={styles.formImage}>
                <Text>IMAGEM DO JOGO AQUI</Text>
            </View>

            <View style={styles.formButtons}>

                {generateButton(game, user)}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Comunidades</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formText}>
                <Text>DESCRIÇÃO DO GAME AQUI</Text>
            </View>
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
    button: {
        backgroundColor: '#38a69d',
        width: '45%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold'
      },
    buttonReject: {
        backgroundColor: '#ff0000',
        width: '45%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        color: "black"
    },
    form:{
        flex: 1,
        backgroundColor: "white",
        borderRadius: 21,
        elevation: 3,
        height: '80%',
        width: '75%',
        position: 'absolute',
        flexDirection: 'row',
        flexWrap: 'wrap',

        justifyContent: 'center',
    },
    formHeader:{
        justifyContent: "center",
        alignItems: "center",

        height: '10%',
        width: '100%',
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21,

    },
    formImage:{
        
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray",
        height: '30%',
        width: '100%',
    },
    formButtons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        height: '10%',
        width: '100%',
        paddingHorizontal: '5%',

    },
    formText:{
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: "center",
        color: "black",
        marginTop: 50,
    }


});