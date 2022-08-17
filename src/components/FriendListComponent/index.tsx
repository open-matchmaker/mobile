import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppStackParamList, RootStackParamList } from "../../@types/routes";
import { User } from "../../schemas/user";
import { useNavigation } from "@react-navigation/native";
import UserService from "../../services/UserService";
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  user: User;
}


export default function FriendListComponent({ user }: Props ) {
  
  const myFriends = user.userFriends.filter(friend => friend.status === true);

  useEffect(() => {
    userSearch(myFriends)
  }, []);
  
  async function friendsNames() {
    return (
      myFriends.map(async friend => await UserService.getUserById(friend.id))
    );
  }

  let users = [];

  const [lista, setLista] = useState([])

  async function userSearch( myFriends : any ) {

    for(let i = 0; i < myFriends.length; i++){
      const response = await UserService.getUserById(myFriends[i].friend_id);
      users.push(response);
    }
    setLista(users)
  }

console.log(users);

const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

return(

  <View style={ styles.container }>
    <ScrollView>
      {lista && lista.map((user, i) => 
        <TouchableOpacity key={i} style={ styles.friendsButton } onPress={()=>{navigation.push('App', { screen: 'Profile', params: { user: user } })}}>
          <View style={ styles.friendsButtonContent }>
            <Text style={ styles.text }>{user.username}</Text>
          </View>
        </TouchableOpacity>)}
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  friendsButton : {
    flex: 1,
    backgroundColor: '#38AFAF',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  friendsButtonContent : {
    flex: 1,
    flexDirection: 'row',

    alignItems: 'center',
  },
  text : {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 8,
  },
});