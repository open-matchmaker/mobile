// List.js
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

import UserSearchComponent from "../../components/UserSearchComponent";

import useApp from "../../hooks/useApp";

import UserProfile from "../../components/UserProfile/index";
import UserService from "../../services/UserService";

export default function UserSearch () {
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
    <UserSearchComponent user={account} />
  );
}}