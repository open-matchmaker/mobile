import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AppStackParamList } from "../../@types/routes";

import ProfileEditor from "../../components/ProfileEditor/index";

export default function Editor({ route }: NativeStackScreenProps<AppStackParamList, 'Editor'>) {
  return (
    <ProfileEditor user={route.params.user} />
  );
}
