import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { AppStackParamList, RootStackParamList } from "../../@types/routes";
import { User } from "../../schemas/user";
import { useNavigation } from "@react-navigation/native";
import UserService from "../../services/UserService";
import Spacer from 'react-native-spacer';

interface Props {
  user: User;
}


export default function FriendListComponent({ user }: Props ) {
  
  const myFriends = user.userFriends.filter(friend => friend.status === false);

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
      {lista && lista.map((user, i) => 
                    
        <View key={i} style={ styles.friendsButton }>
          <View>
            <Text 
              onPress={()=>{navigation.push('App', { screen: 'Profile', params: { user: user } })}}
              >{user.username}</Text>
          </View>
      </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142230',
    padding: 10,
  },
  friendsButton : {
    flex: 1,
    backgroundColor: '#38AFAF',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
  },
  friendsButtonContent : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  text : {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 8,
  },
});