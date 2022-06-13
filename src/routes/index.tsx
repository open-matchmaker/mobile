import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../@types/routes';

import useSession from '../hooks/useSession';

import Welcome from '../screens/Welcome';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

import App from './app';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const session = useSession();

  return (
    <Navigator initialRouteName={session.account ? 'App' : 'Welcome'}>
      <Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
      <Screen name="App" component={App} options={{ headerShown: false }} />
    </Navigator>
  )
}
