import React from "react";
import { Button, Text } from "react-native";

import useApp from "../../hooks/useApp";

export default function Home() {
  const { account, logout } = useApp();

  return (
    <>
      <Text>{JSON.stringify(account, null, 2)}</Text>
      <Button onPress={() => logout()} title='logout' />
    </>
  );
}
