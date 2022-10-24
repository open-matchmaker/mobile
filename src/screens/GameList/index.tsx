import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { AppStackParamList } from "../../@types/routes";
import GameListComponent from "../../components/GameListComponent";
import { User } from "../../schemas/user";

interface Props {
  user: User;
}

export default function GameList({ route }: NativeStackScreenProps<AppStackParamList, 'GameList'>) {
  return(
    <GameListComponent/>
  )
}