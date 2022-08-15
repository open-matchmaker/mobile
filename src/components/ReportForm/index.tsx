import React from "react";
import { View, Text } from "react-native";
import { User } from "../../schemas/user";

interface Props {
    user: User;
  }

export default function ReportForm({ user }: Props) {
    return (
        <View>
        <Text>{user.username}, {user.id}</Text>
        </View>
    );

}
