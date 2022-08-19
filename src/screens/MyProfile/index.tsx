import React, { useState } from "react";

import useApp from "../../hooks/useApp";

import UserProfile from "../../components/UserProfile/index";
import UserService from "../../services/UserService";

import { Text } from "react-native";

export default function MyProfile() {
  const { account } = useApp();

  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getUser = async () => {
      UserService.getUserById(14).then((response) => {
      setUser(response);
      setLoading(false);
    });
  };
 
 
  if (isLoading) {
    getUser();
    return (<Text>carregando</Text>);
  } else {
  return (
    <UserProfile user={user} />
  );
}}
