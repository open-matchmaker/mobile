import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import {CheckBox, Input} from 'react-native-elements';
import useApp from "../../hooks/useApp";
import UserService from "../../services/UserService";
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik';
import { User, UpdateDto } from "../../schemas/user";
import GameService from "../../services/GameService";

interface Props {
    user: User;
  }

export default function UserProfile({ user }: Props) {  
    const updateSchema = Yup.object().shape({
        bio: Yup.string().max(255, 'Bio não pode ter mais de 255 caracteres'),
        games: Yup.array(),
    });

    const onSubmit = useCallback(async (values: UpdateDto, helpers: FormikHelpers<UpdateDto>) => {

       GameService.addGameToUser({id:1});

        try {    
        const response = await UserService.updateProfile(values)
        console.log(response)
        } catch (error: any) {
          alert(error + " ocorreu algum erro na atualização dos dados, tente novamente mais tarde")
        }
      }, []);
    
    const[text, setText] = useState('');

    async function getGameSearch(text: string) {
        const response = await GameService.getGameByName(text);
        return response.data;
    }

    const onChangeText = useCallback((text: string) => {
        let matches = [];
        setText(text);
        console.log(getGameSearch(text));
    }
    , []);

   
    return(
        <View style={styles.container}>
            <Formik<UpdateDto>
        initialValues={{ bio: user.bio}}
        onSubmit={onSubmit}
        validationSchema={updateSchema}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.editContainer}>
            <Text style={styles.text}>Bio</Text>
            <TextInput
              placeholder={user.bio || 'Digite sua bio'}            
              value={values.bio}
              onChangeText={handleChange('bio')}
              onBlur={handleBlur('bio')} />
            
            <View style={styles.games}>
                <Text style={styles.text}>Jogos</Text>
                <TextInput onChangeText={onChangeText} placeholder="Digite o nome do jogo"/>
                
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
  