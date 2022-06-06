import { NavigatorScreenParams } from "@react-navigation/native";

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
}

export type HomeTabParamList = {
  Feed: undefined
}
