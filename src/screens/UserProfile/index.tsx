import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { User } from "../../schemas/user";




export default function UserProfile(user:User){
    
    return ( 
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View>
                    <Image style={styles.image} source={(require('../../assets/img/bg.jpg'))}/>
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
                    <Text style={{alignSelf:'center'}}>
                        {user.bio}
                    </Text>
                </View>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#38a69d',
        alignItems:'center',
        // justifyContent:'center',
    },
    imageContainer:{
        height:340,
        width: 320,
        backgroundColor:'white',
        borderRadius:21,
        elevation:3,
        marginTop:100
    },
    image:{
        height:130,
        width:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    avatarContainer:{
        height:100,
        width:100,
        alignSelf:'center',
        position:'absolute',
        top:80,
    },
    avatar:{
        height:100,
        width:100,
        borderRadius:60,
        backgroundColor:'black'
    },
    textContainer:{
        height:26,
        width:169,
        position:'absolute',
        top:196,
        left:75,
        alignItems:'center',
    },
    text:{
        alignSelf:'center',
        fontWeight:'bold',
    }

    
});