// List.js
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

import UserSearchComponent from "../../components/UserSearchComponent";

import useApp from "../../hooks/useApp";

import UserProfile from "../../components/UserProfile/index";
import UserService from "../../services/UserService";

export default function UserSearch () {
  const { account } = useApp();


  return (
    <UserSearchComponent user={account} />
  );
}