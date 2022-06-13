import React from "react";
import { StyleSheet, View, TouchableOpacity, } from "react-native";
import { Text, Caption, Paragraph, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

import { Post } from "../schemas/post";

import { RootStackParamList } from "../@types/routes";


interface Props {
  post: Post;
  disabled?: boolean
}

export default function PostOverview({ post, disabled }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function handlePress() {
    navigation.push('App', { screen: 'Post', params: { id: post.id } })
  }

  return (
    <TouchableOpacity style={styles.container} disabled={disabled} onPress={() => handlePress()}>
      <View style={styles.header}>
        <Text
          style={styles.fontBold}
          onPress={() => navigation.push('App', { screen: 'Profile', params: { user: post.creator } })}
        >
          {`${post.creator.username} ${post.postsId ? 'comentou' : 'postou'}`}
        </Text>
        <Caption>{dayjs(post.createdAt).fromNow()}</Caption>
      </View>

      <Paragraph>{post.content}</Paragraph>
      <Divider style={{ marginVertical: 10 }} />
      <View >
        <Text style={styles.fontBold}>{`${post.Comments.length} comentario${post.Comments.length !== 1 ? 's' : ''}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fontBold: {
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: 12,
    color: "#999",
  },
});
