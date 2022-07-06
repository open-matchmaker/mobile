import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import useApp from "../../hooks/useApp";
import UserService from "../../services/UserService";

import { User } from "../../schemas/user";

interface Props {
  user: User;
}

function addFriend(){
  console.log("add friend");
}

function generateFriendButton( requestSent:boolean, requestReceived:boolean, isMyFriend:boolean, isMe:boolean, user:User ){

  if(isMe){
    return(
      <View>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Editar Perfil</Text></TouchableOpacity>
      </View>
    );
  }

  if(
    requestSent && !requestReceived
    ){
    return (
      <View>
        <TouchableOpacity style={styles.button} disabled><Text style={styles.buttonText}>Solicitação enviada</Text></TouchableOpacity>
      </View>
    );
  }

  if(
    requestReceived && !requestSent
    ){
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => UserService.acceptFriendRequest(user.id)}><Text style={styles.buttonText}>Aceitar como amigo</Text></TouchableOpacity>
      </View>
    );
  }

  if(
    isMyFriend
    ){
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => UserService.rejectFriendRequest(user.id)}><Text style={styles.buttonText}>Desfazer amizade</Text></TouchableOpacity>
      </View>
    );
  }

}


export default function UserProfile({ user }: Props) {
  const profileOwner = user;
  const me = useApp().account;
  const isMe = profileOwner.id === me.id;
  let requestSent : boolean = false;
  let requestReceived : boolean = false;
  let isMyFriend : boolean = false;
  try{
    
    requestSent = me.userFriends.some((friend:User) => friend.id === profileOwner.id);
    requestReceived = me.friendUserFriends.some((friend:User) => friend.id === profileOwner.id);

    isMyFriend = requestSent && requestReceived;
  }
  catch{
    console.log("erro ao caregar listas de amigos :(");
  }
  finally{
    console.log(isMe, profileOwner, me)

  }
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View>
          <Image style={styles.image} source={(require('../../assets/img/bg.jpg'))} />
        </View>
        <View style={styles.avatarContainer}>
          <View>
            <Image style={styles.avatar} source={require('../../assets/img/user.jpg')} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {user.username}
          </Text>
          <Text style={{ alignSelf: 'center' }}>
            Bio: asldjaj{user.bio}
          </Text>
            <Text style={styles.text}>
              Joga os jogos: {user.playsGames} X, Y E Z
            </Text>
            <Text style={styles.text}>
            seguindo: xxx 
            </Text>
          {generateFriendButton(requestSent, requestReceived, isMyFriend, isMe, user)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
    alignItems: 'center',
   
  },
  imageContainer: {
    height: 340,
    width: 320,
    backgroundColor: 'white',
    borderRadius: 21,
    elevation: 3,
    marginTop: 100
  },
  image: {
    height: 130,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  avatarContainer: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    position: 'absolute',
    top: 80,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 60,
    backgroundColor: 'black'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',

    height: 26,
    minWidth: 169,

    top: 75,
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
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
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  }
});


