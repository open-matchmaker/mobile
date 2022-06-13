import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { HomeTabParamList } from '../@types/routes';

import Feed from '../screens/Feed';
import MyProfile from '../screens/MyProfile';

const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();

export default function Home() {
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
    </Navigator>
  )
}
