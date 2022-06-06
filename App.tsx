import 'dayjs/locale/pt-br';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import Routes from './src/routes';
import SessionContextProvider from './src/contexts/session';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <SessionContextProvider>
          <StatusBar backgroundColor="#38A69D" barStyle="light-content" />
          <Routes />
        </SessionContextProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
