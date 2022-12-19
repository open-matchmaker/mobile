// List.js
import React, { useState, useEffect} from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import UserService from "../../services/UserService";
import { User } from "../../schemas/user";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList, RootStackParamList } from "../../@types/routes";

interface Props {
  user: User;
}

export default function UserSearchComponent({ user }: Props ) {

  const allUsers = user.userFriends;

  useEffect(() => {
    userSearch(allUsers, input)
  }, []);
  
  let users = [];

  const [lista, setLista] = useState([])
  const [input, setInput] = useState('')

  console.log(input)

  async function userSearch( allUsers : any, input : any) {

  const everything = await UserService.getAllUsers();

  for(let i = 0; i < everything.length; i++){
    if (everything[i].username.toLowerCase().includes(input) && input !== '') {
      users.push(everything[i]);
      console.log(everything[i])
    }
  }
  setLista(users)
  }

// console.log(users);

const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

return (
  <View style={ styles.container }>
    <TextInput style={ styles.input } onChangeText={(text) => userSearch(allUsers, text.toLowerCase())} 
    placeholder="Buscar Usuário..."/>
    <ScrollView>
    {lista && lista.map((user, i) => 
      <TouchableOpacity key={i} style={ styles.friendsButton } onPress={()=>{navigation.push('App', { screen: 'Profile', params: { user: user } })}}>
        <View style={ styles.searchButtonContent }>
          <View style={styles.avatarContainer}>
            <View>
              <Image style={styles.avatar} source={require('../../assets/img/user.jpg')} />
            </View>
          </View>
          <View style={styles.searchButtonText}>
            <Text style={ styles.text }>{user.username}</Text>
            <Text style={ styles.bottomText }>{user.email}</Text>
            <Text style={ styles.bottomText }>{user.bio}</Text>
          </View>
        </View>
      </TouchableOpacity>)}
    </ScrollView>
  </View>
  
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    scrollEnabled: false
  },
  input: {
    margin: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
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
  searchButtonContent : {
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
  searchButtonText : {
    flex: 1,
    flexDirection: 'column',
    width: '85%',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
});
