import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { HomeTabParamList } from '../@types/routes';

import { User } from "../schemas/user";

import Feed from '../screens/Feed';
import MyProfile from '../screens/MyProfile';
import Queue from '../screens/Queue';
import GameList from '../screens/GameList';
import UserSearch from '../screens/UserSearch';	

interface Props {
  user: User;
}

const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();

export default function Home( { user }: Props ) {
  return (
    
    <Navigator initialRouteName='Feed'>
      <Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          )
        }}
      />
      <Screen
        name="Pesquisa"
        component={UserSearch}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          )
        }}
      />
      <Screen
        name = "Queue"
        component={Queue}
        options={{
          headerShown: false,
          title: 'Fila',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome 
              name="rocket"
              size={size}
              color={color} />
          )
        }}
      />
      <Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerShown: false,
          title: "Meu Perfil",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name='user'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen 
        name="Games"
        component={GameList}
        options={{
          headerShown: false,
          title: "Jogos",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name='gamepad'
              size={size}
              color={color}
            />
          )
        }}
      >
      </Screen>
    </Navigator>
  )
}
