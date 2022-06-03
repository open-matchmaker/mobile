import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import SessionContextProvider from './src/contexts/session';

export default function App() {
  return (
    <NavigationContainer>
      <SessionContextProvider>
        <StatusBar backgroundColor="#38A69D" barStyle="light-content" />
        <Routes />
      </SessionContextProvider>
    </NavigationContainer>
  );
}
