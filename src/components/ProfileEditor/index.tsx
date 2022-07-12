import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import {CheckBox} from 'react-native-elements';
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
    const createGame = GameService.addGameToUser({id:1})
   
                            
    
    const updateSchema = Yup.object().shape({
        bio: Yup.string().max(255, 'Bio não pode ter mais de 255 caracteres'),
        games: Yup.array(),
    });

    const onSubmit = useCallback(async (values: UpdateDto, helpers: FormikHelpers<UpdateDto>) => {

        lol ? GameService.addGameToUser(1): console.log(lol);

        try {    
        const response = await UserService.updateProfile(values)
        console.log(response)
        } catch (error: any) {
          alert(error + " ocorreu algum erro na atualização dos dados, tente novamente mais tarde")
        }
      }, []);
    
    var [counterStrike, setChecked1] = useState(false);
    var [lol, setChecked2] = useState(false);
    var [overwatch, setChecked3] = useState(false);
    var [fortnite, setChecked4] = useState(false);
    var [apex, setChecked5] = useState(false);
    var [valorant, setChecked6] = useState(false);

    console.log("user: ", user);
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
                <View style={styles.game}>
                    <CheckBox checked={counterStrike} onPress={()=>setChecked1(!counterStrike)} />
                    <Text> Counter Strike</Text>
                </View>
                <View style={styles.game}>
                    <CheckBox checked={lol} onPress={()=>setChecked2(!lol)} />
                    <Text> League of Legends</Text>
                </View>
                <View style={styles.game}>
                    <CheckBox checked={overwatch} onPress={()=>setChecked3(!overwatch)} />
                    <Text> Overwatch</Text>
                </View>
                <View style={styles.game}>
                    <CheckBox checked={fortnite} onPress={()=>setChecked4(!fortnite)} />
                    <Text> Fortnite</Text>
                </View>
                <View style={styles.game}>
                    <CheckBox checked={apex} onPress={()=>setChecked5(!apex)} />
                    <Text> Apex Legends</Text>
                </View>
                <View style={styles.game}>
                    <CheckBox checked={valorant} onPress={()=>setChecked6(!valorant)} />
                    <Text> Valorant</Text>
                </View>
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
  