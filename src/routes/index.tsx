import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../@types/routes';

import Welcome from '../screens/Welcome';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Navigator>
      <Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Screen name='SignUp' component={SignUp} />
    </Navigator>
  )
}