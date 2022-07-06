import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import useApp from "../../hooks/useApp";

import { User } from "../../schemas/user";

interface Props {
  user: User;
}

function addFriend(){
  console.log("add friend");
}

function generateFriendButton(
  // requestSent:Boolean, requestReceived:Boolean, isMyFriend:Boolean,
  isMe:Boolean){

  if(isMe){
    return null;
  }

  // if(requestSent && !requestReceived){
  //   return (
  //     <View style={styles.friendButton}>
  //       <Text style={styles.friendButtonText}>Request Sent</Text>
  //     </View>
  //   );
  // }

  // if(requestReceived && !requestSent){
  //   return (
  //     <View style={styles.friendButton}>
  //       <Text style={styles.friendButtonText}>Accept Request</Text>
  //     </View>
  //   );
  // }

  // if(isMyFriend){
  //   return (
  //     <View style={styles.friendButton}>
  //       <Text style={styles.friendButtonText}>Friends</Text>
  //     </View>
  //   );
  // }

}


export default function UserProfile({ user }: Props) {
  const profileOwner = user;
  const me = useApp().account;
  const isMe = profileOwner.id === me.id;
  try{
    
    const requestSent = me.userFriends.some((friend:User) => friend.id === profileOwner.id);
    const requestReceived = me.friendUserFriends.some((friend:User) => friend.id === profileOwner.id);

    const isMyFriend = requestSent && requestReceived;
  }
  catch{
    console.log("erro ao caregar listas de amigos :(");
  }
  finally{
    // const isMe = me.id === profileOwner.id;
    console.log(isMe, profileOwner, me)

    // generateFriendButton(requestSent, requestReceived, isMyFriend, isMe);
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
              Joga os jogos: {user.playsGame} X, Y E Z
            </Text>
          {generateFriendButton(isMe)}
            <Text style={styles.text}>
            seguindo: xxx | seguidores: yyy
            </Text>
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
    // justifyContent:'center',
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
    justifyContent: 'center',
    height: 26,
    minWidth: 169,

    top: 75,
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
  }
});
