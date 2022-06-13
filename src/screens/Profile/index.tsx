import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AppStackParamList } from "../../@types/routes";

import UserProfile from "../../components/UserProfile/index";

export default function Profile({ route }: NativeStackScreenProps<AppStackParamList, 'Profile'>) {
  return (
    <UserProfile user={route.params.user} />
  );
}
