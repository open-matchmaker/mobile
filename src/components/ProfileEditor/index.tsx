import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import useApp from "../../hooks/useApp";
import UserService from "../../services/UserService";

import { User } from "../../schemas/user";

interface Props {
    user: User;
  }

export default function UserProfile({ user }: Props) {

    
    console.log("user: ", user);
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{user.username}</Text>
        </View>
    )


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    name: {
        fontSize: 20,	
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
});
  