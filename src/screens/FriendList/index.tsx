import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { AppStackParamList } from "../../@types/routes";
import FriendListComponent from "../../components/FriendListComponent";
import { User } from "../../schemas/user";

interface Props {
  user: User;
}

export default function FriendList({ route }: NativeStackScreenProps<AppStackParamList, 'FriendList'>) {
  return(
    <FriendListComponent user={ route.params.user }/>
  )
}