import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { createContext, useCallback, useMemo } from "react";
import { RootStackParamList } from "../@types/routes";
import useSession from "../hooks/useSession";

import { User } from "../schemas/user";

interface AppContext {
  account: User;
  logout: () => void;
}

export const AppContext = createContext<AppContext>({} as AppContext);

interface Props {
  children: React.ReactNode
}

export default function AppContextProvider({ children }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { account, logout } = useSession();

  const logoutApp = useCallback(async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }]
    });
  }, [logout, navigation]);

  if (!account) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }]
    });

    return null;
  } else {

    const value = useMemo(() => ({
      account,
      logout: logoutApp
    }), [account, logout])

    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    )
  }

}
