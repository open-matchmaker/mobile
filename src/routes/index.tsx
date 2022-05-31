import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/Welcome';
import SignIn from '../screens/SignIn';
import { RootStackParamList } from '../@types/routes';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Navigator>
      <Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    </Navigator>
  )
}