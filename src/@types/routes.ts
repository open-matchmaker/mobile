import { NavigatorScreenParams } from "@react-navigation/native";
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
  UserProfile: {user:User}
}

export type HomeTabParamList = {
  Feed: undefined
  MyProfile: undefined
}
