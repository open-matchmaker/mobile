import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppStackParamList } from '../@types/routes';
import AppContextProvider from '../contexts/app';

import Home from './home';
import Post from '../screens/Post';

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export default function Routes() {
  return (
    <AppContextProvider>
      <Navigator initialRouteName='Home'>
        <Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Screen name="Post" component={Post} />
      </Navigator>
    </AppContextProvider>
  )
}
