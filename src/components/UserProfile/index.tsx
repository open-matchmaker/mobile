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
      <View style={ styles.buttonContainer }>
        <TouchableOpacity style={styles.button} onPress={() => navigation.push('App', { screen: 'Editor', params: { user: user } })}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if(requestSent && !requestReceived){
    return (
      <View style={ styles.buttonAlreadySearchedContainer}>
        <TouchableOpacity style={styles.button} disabled>
          <Text style={styles.buttonSearchText}>Solicitação enviada</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.buttonReportSend} onPress={() => report(user,navigation)}>
            <Text style={styles.buttonReportText}>Denunciar usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
  
    );
  }

  if(requestReceived && !requestSent){
    return (
      <View style={ styles.buttonSolicitationContainer }>
        <TouchableOpacity style={styles.buttonSolicitation} onPress={() => UserService.acceptFriendRequest({user_id: user.id, friend_Id:me.id})}>
          <Text style={styles.buttonSolicitationText}>Aceitar como amigo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReject} onPress={() => UserService.rejectFriendRequest({user_id: user.id, friend_Id:me.id})}>
          <Text style={styles.buttonRejectText}>Rejeitar solicitação</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.buttonReportAccept} onPress={() => report(user,navigation)}>
            <Text style={styles.buttonReportText}>Denunciar usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if(isMyFriend){
    return (
      <View style={ styles.buttonSolicitationContainer }>
        <TouchableOpacity style={styles.buttonReject} onPress={() => UserService.removeFriend({user_id: me.id, friend_Id:user.id })}>
          <Text style={styles.buttonRejectText}>Desfazer amizade</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.buttonReportRemove} onPress={() => report(user,navigation)}>
            <Text style={styles.buttonReportText}>Denunciar usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if(!requestReceived && !requestSent && !isMyFriend){
    return (
      <View style={ styles.buttonSearchedContainer }>
        <TouchableOpacity style={styles.button} onPress={() => UserService.sendFriendRequest({user_id:me.id, friend_Id:user.id})}>
          <Text style={styles.buttonSearchText}>Enviar solicitação</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.buttonReportSearch} onPress={() => report(user,navigation)}>
            <Text style={styles.buttonReportText}>Denunciar usuário</Text>
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
      <View style={ styles.infoContainer }>
        <View>
          <Image style={styles.backgroundImage} source={(require('../../assets/img/bg.jpg'))} />
        </View>
        <View style={ styles.profileImageContainer }>
          <Image style={styles.profileImage} source={require('../../assets/img/user.jpg')} />
        </View>
        <View style={ styles.nameContainer }>
          <Text style={styles.nameText}>
            {user.username}
          </Text>
        </View>

        <View style={ styles.bioContainer }>
          <Text>
            {user.bio}
          </Text>
          
        </View>
        
        <View style={ styles.gamesContainer }>
          <Text>
            {gamesNames()}
          </Text>
        </View>

        <View style={styles.friendsContainer}>
          <Text onPress={() => navigation.push('App', { screen: 'FriendList', params: { user: user } })}>
            <Text style={ styles.boldText }>{friendCounter()} Amigos</Text>
          </Text>
        </View>
        {generateFriendButton(requestSent, requestReceived, isMyFriend, isMe, user)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  infoContainer: {
    height: '44%',
    width: '100%',
    backgroundColor: '#f0f0f0',
    elevation: 3,
  },
  backgroundImage: {
    height: 125,
    width: '100%',
  },
  profileImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 80,
    width: 80,
    borderRadius: 60,
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginLeft: '5%',
    bottom: '10%'
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 60,
    alignSelf: 'center',
  },
  nameContainer: {
    marginLeft: 15,
    bottom: '9%',
  },
  nameText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonContainer: {
    display: 'flex',
    backgroundColor: '#38a69d',
    width: '28%',
    height: '11%',
    borderRadius: 20,
    padding: '0.5%',
    alignSelf: 'center',
    bottom: '57%', 
    left: '33%',
  },
  buttonSearchedContainer: {
    display: 'flex',
    backgroundColor: '#38a69d',
    width: '36%',
    height: '11%',
    borderRadius: 20,
    padding: '0.5%',
    alignSelf: 'center',
    bottom: '45%', 
    left: '30%',
  },
  buttonAlreadySearchedContainer: {
    display: 'flex',
    backgroundColor: '#38a69d',
    width: '38%',
    height: '11%',
    borderRadius: 20,
    padding: '0.5%',
    alignSelf: 'center',
    bottom: '45%', 
    left: '30%',
  },
  buttonSolicitationContainer: {
    display: 'flex',
    backgroundColor: '#38a69d',
    width: '40%',
    height: '11%',
    borderRadius: 20,
    padding: '0.5%',
    alignSelf: 'center',
    bottom: '57%', 
    left: '28%',
  },
  button: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    height: '99%',
    width: '100%',
  },
  buttonSolicitation: {
    backgroundColor: '#38a69d',
    borderRadius: 20,
    height: '99%',
    width: '100%',
  },
  buttonSolicitationText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '3%',
  },
  buttonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold', 
    alignSelf: 'center',
    marginTop: '6%',
  },
  buttonSearchText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '4%',
  },
  gamesContainer: {
    bottom: '7%',
    marginLeft: 15,
    marginTop: 8,
  },
  bioContainer: {
    bottom: '7%',
    marginLeft: 15,
  },
  friendsContainer: {
    marginTop: 10, 
    marginLeft: 15, 
    bottom: '5%',
    width: '18%', 
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonReject: {
    backgroundColor: '#FF0000',
    height: '99%',
    width: '95%',
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    left: '6%',
  },
  buttonReportSend: {
    backgroundColor: '#FF0000',
    height: '68%',
    width: '95%',
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    left: '3%',
  },
  buttonReportRemove: {
    backgroundColor: '#FF0000',
    height: '60%',
    width: '93%',
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    left: '6%',
  },
  buttonReportAccept: {
    backgroundColor: '#FF0000',
    height: '64%',
    width: '94%',
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    left: '7%',
  },
  buttonReportSearch: {
    backgroundColor: '#FF0000',
    height: '68%',
    width: '99%',
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    left: '1%',
  },
  buttonReportText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: '0.5%',
  },
  buttonRejectText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});


