import React, { useState, useMemo, useCallback, createContext, useEffect } from "react";
import { View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';;
import { AxiosError } from "axios";

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

    function injectInterceptor() {
      console.log('injectInterceptor');
      api.interceptors.response.use((response) => response, async (error: AxiosError) => {
        const { config: originalConfig } = error
        originalConfig.retry = originalConfig.retry || 0

        if (originalConfig?.url !== '/session' && error.response) {
          if (error.response.status === 401 && originalConfig.retry < 2) {
            try {
              console.log('Unauthorized, refreshing session...');
              originalConfig.retry += 1

              const session = await SessionService.refresh();

              api.defaults.headers.common.Authorization = `Bearer ${session.token}`;

              await StorageService.storeData("token", session.token);

              return api({
                ...originalConfig, headers: {
                  ...originalConfig.headers,
                  Authorization: `Bearer ${session.token}`
                }
              });
            } catch (err) {
              console.warn('Error on refreshing session', err);
            }
          } else {
            console.log('Impossible to refresh session, aborting...');
          }
        }

        console.warn(`[${error.message}] ${originalConfig?.method?.toUpperCase()} ${originalConfig?.url
          } ${JSON.stringify(error?.response?.data, null, 2) || ''} retry: ${originalConfig?.retry
          }`)
        return Promise.reject(error)
      });
    }

    injectInterceptor();
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
