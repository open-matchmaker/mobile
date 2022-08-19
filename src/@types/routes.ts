import { NavigatorScreenParams } from "@react-navigation/native";
import { Game } from "../schemas/game";
import { User } from "../schemas/user";

export type RootStackParamList = {
  Welcome: undefined
  SignIn: undefined
  SignUp: undefined
  App: NavigatorScreenParams<AppStackParamList>
};

export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>
  Post: {
    id: number
  }
  Profile: {
    user: User
  }
  Editor:{
    user: User
  }
  GameScreen:{
    game: Game
  }
  ReportScreen:{
    user: User
  }
  FriendList:{
    user: User
  }
}

export type HomeTabParamList = {
  Feed: undefined
  MyProfile: undefined
  Queue: undefined

}
