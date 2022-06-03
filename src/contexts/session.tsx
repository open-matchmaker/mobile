import React, { useState, useMemo, useCallback, createContext, useEffect } from "react";
import { View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';;

import { LoginDto } from "../schemas/session";
import { User } from "../schemas/user";
import StorageService from "../services/StorageService";
import SessionService from "../services/SessionService";
import api from "../services/api";
import UserService from "../services/UserService";

interface SessionContext {
  account: User | null;
  login: (login: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const SessionContext = createContext<SessionContext>({} as SessionContext);

interface Props {
  children: React.ReactNode
}

export default function SessionContextProvider({ children }: Props) {
  const [account, setAccount] = useState<User | null>(null);
  const [sessionIsReady, setSessionIsReady] = useState(false);

  const postLogin = useCallback(async (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const account = await UserService.whoami();

    setAccount(account);
  }, []);

  const login = useCallback(async ({ email, password }: LoginDto) => {
    const { token } = await SessionService.login(email, password);

    await StorageService.storeData("token", token);

    await postLogin(token);
  }, []);

  const logout = useCallback(async () => {
    await StorageService.removeData('token');
    api.defaults.headers.common.Authorization = '';
  }, []);

  useEffect(() => {
    async function loadResourcesAsync() {
      console.log('loadResourcesAsync');
      try {
        await SplashScreen.preventAutoHideAsync();

        const token = await StorageService.getData<string>('token');

        if (token) {
          await postLogin(token);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setSessionIsReady(true);
        console.log('loadResourcesAsync done');
      }
    }

    loadResourcesAsync();
  }, []);

  const onLayoutRootView = useCallback(() => sessionIsReady && SplashScreen.hideAsync(), [sessionIsReady]);

  const value = useMemo(() => ({
    account,
    login,
    logout
  }), [account, login, logout]);

  if (!sessionIsReady) return null

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SessionContext.Provider value={value}>
        {children}
      </SessionContext.Provider>
    </View>
  );
}
