import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import useApp from "../../hooks/useApp";
import UserService from "../../services/UserService";

import { User } from "../../schemas/user";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList, RootStackParamList } from "../../@types/routes";
import { useNavigation } from "@react-navigation/native";


interface Props {
  user: User;
}

function addFriend(){
  console.log("add friend");
}

function generateFriendButton( requestSent:boolean, requestReceived:boolean, isMyFriend:boolean, isMe:boolean, user:User) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const me = useApp().account;
  if(isMe){
    return(
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.push('App', { screen: 'Editor', params: { user: user } })}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if(requestSent && !requestReceived){
    return (
      <View>
        <TouchableOpacity style={styles.button} disabled>
          <Text style={styles.buttonText}>Solicitação enviada</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.buttonReject} onPress={() => report(user,navigation)}>
            <Text style={styles.buttonText}>Denunciar usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
  
    );
  }

  if(requestReceived && !requestSent){
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => UserService.acceptFriendRequest({fromId: user.id, toId:me.id})}>
          <Text style={styles.buttonText}>Aceitar como amigo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReject} onPress={() => UserService.rejectFriendRequest({fromId: user.id, toId:me.id})}>
          <Text style={styles.buttonText}>Rejeitar solicitação</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.buttonReject} onPress={() => report(user,navigation)}>
            <Text style={styles.buttonText}>Denunciar usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if(isMyFriend){
    return (
      <View>
        <TouchableOpacity style={styles.buttonReject} onPress={() => UserService.removeFriend({fromId: me.id, toId:user.id })}>
          <Text style={styles.buttonText}>Desfazer amizade</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.buttonReject} onPress={() => report(user,navigation)}>
            <Text style={styles.buttonText}>Denunciar usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if(!requestReceived && !requestSent && !isMyFriend){
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => UserService.sendFriendRequest({fromId:me.id, toId:user.id})}>
          <Text style={styles.buttonText}>Enviar solicitação</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.buttonReject} onPress={() => report(user,navigation)}>
            <Text style={styles.buttonText}>Denunciar usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

function report(user:User, navigation:NativeStackNavigationProp<RootStackParamList>){
  navigation.push('App', { screen: 'ReportScreen', params: { user: user } });
}

export default function UserProfile({ user }: Props) {
  const profileOwner = user;
  const me = useApp().account;
  const isMe = profileOwner.id === me.id;
  let requestSent : boolean = false;
  let requestReceived : boolean = false;
  let isMyFriend : boolean = false;
  try{
    
    requestSent = me.userFriends.some((friendship) => friendship.friend_id === profileOwner.id);
    requestReceived = me.friendUserFriends.some((friendship) => friendship.user_id === profileOwner.id);

    isMyFriend = requestSent && requestReceived;
  }
  catch{
    console.log("erro ao caregar listas de amigos :(");
  }
  finally{
    console.log(isMe, profileOwner, me)

  }
  
  function gamesNames(){
    let games = "";
    profileOwner.playsGames.forEach((game:any) => {
      games += game.name + ", ";
    }
    );
    return games;
  }

  function friendCounter(){
    let counter = 0;
    profileOwner.userFriends.forEach((friendship:any) => {
      if(friendship.status) counter++;
    }
    );
    return counter;
  }

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
            Bio: {user.bio}
          </Text>
            <Text style={styles.text}>
              Joga os jogos: {gamesNames()}
            </Text>
            <Text style={styles.text} onPress={() => navigation.push('App', { screen: 'FriendList', params: { user: user } })}>
              Amigos: {friendCounter()} 
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
    height: 420,
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
    minHeight: 50,
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
    backgroundColor: '#FF0000',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
});


