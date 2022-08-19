import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppStackParamList, RootStackParamList } from "../../@types/routes";
import { User } from "../../schemas/user";
import { useNavigation } from "@react-navigation/native";
import UserService from "../../services/UserService";

interface Props {
  user: User;
}


export default function FriendListComponent({ user }: Props ) {
  
  const myFriends = user.userFriends.filter(friend => friend.status === true);

  useEffect(() => {
    userSearch(myFriends)
  }, []);
  
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
    <View>
      {lista && lista.map((user, i) => 
        <TouchableOpacity key={i} style={ styles.friendsButton } onPress={()=>{navigation.push('App', { screen: 'Profile', params: { user: user } })}}>

          <View style={ styles.friendsButtonContent }>
          <View style={styles.avatarContainer}>
            <View>
              <Image style={styles.avatar} source={require('../../assets/img/user.jpg')} />
            </View>
          </View>
          <View style={styles.friendsButtonText}>
            <Text style={ styles.text }>{user.username}</Text>
            <Text style={ styles.bottomText }>{user.email}</Text>
            <Text style={ styles.bottomText }>{user.bio}</Text>
          </View>
          </View>
        </TouchableOpacity>)}
    </View>
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
    backgroundColor: '#DDD',
    width: '100%',
    maxHeight: 60,
    minHeight: 60,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
  },
  friendsButtonContent : {
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
  friendsButtonText : {
    flex: 1,
    flexDirection: 'column',
    width: '85%',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
});