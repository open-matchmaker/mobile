import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AppStackParamList } from "../../@types/routes";

import ReportForm from "../../components/ReportForm/index";

export default function Report({ route }: NativeStackScreenProps<AppStackParamList, 'ReportScreen'>) {
  return (
    <ReportForm user={route.params.user} />
  );
}
