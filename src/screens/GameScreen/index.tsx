import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AppStackParamList } from "../../@types/routes";
import GameOverview from "../../components/GameOverview";


export default function GameScreen({ route }: NativeStackScreenProps<AppStackParamList, 'GameScreen'>) {
  return(
    <GameOverview game={route.params.game} />
  )
}