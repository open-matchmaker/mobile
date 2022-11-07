import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button } from "react-native";
import {CheckBox, Input} from 'react-native-elements';
import useApp from "../../hooks/useApp";
import UserService from "../../services/UserService";
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik';
import { User, UpdateDto } from "../../schemas/user";
import GameService from "../../services/GameService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/routes";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

interface Props {
    user: User;
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

export default function UserProfile({ user }: Props) {  
    const updateSchema = Yup.object().shape({
        bio: Yup.string().max(255, 'Bio não pode ter mais de 255 caracteres')
    });

    const onSubmit = useCallback(async (values: UpdateDto, helpers: FormikHelpers<UpdateDto>) => {

        try {    
        const response = await UserService.updateProfile(values)
        console.log(response)
        } catch (error: any) {
          alert(error + " ocorreu algum erro na atualização dos dados, tente novamente mais tarde")
        }
      }, []);
    
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

    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };


    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

   
    return(
        <View style={styles.container}>


            <Formik<UpdateDto>
        initialValues={{ bio: user.bio}}
        onSubmit={onSubmit}
        validationSchema={updateSchema}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.editContainer}>
            <View>
      <TouchableOpacity style={styles.button} onPress={pickImage} >
      <Text style={styles.buttonText}>Selecionar imagem</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image}} style={{ width: 200, height: 200 }} />}
    </View>
            <Text style={styles.text}>Bio</Text>
            <TextInput
              placeholder={user.bio || 'Digite sua bio'}            
              value={values.bio}
              onChangeText={handleChange('bio')}
              onBlur={handleBlur('bio')} />
            
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
              
            <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
        </View>
            
        )}
        </Formik>
        </View>
    )



};

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
  