import React, { useCallback, useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppStackParamList } from "../../@types/routes";
import PostService from "../../services/Post.Service";
import { Post as IPost } from "../../schemas/post";
import PostOverview from "../../components/PostOverview";
import PostForm from "../../components/PostForm";


export default function Post({ route }: NativeStackScreenProps<AppStackParamList, 'Post'>) {
  const navigation = useNavigation();
  const [post, setPost] = useState<IPost>();

  async function getPost() {
    const post = await PostService.getById(route.params.id);
    setPost(post);
  }

  const handleSubmit = useCallback(async (content) => {
    if (content.length === 0) return;

    await PostService.create(content, route.params.id);

    getPost();
  }, []);

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getPost();
    })
  }, [navigation])

  if (!post) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <FlatList<IPost>
        removeClippedSubviews={false}
        data={post.Comments || []}
        keyExtractor={(post) => `${post.id}`}
        renderItem={({ item }) => (
          <PostOverview post={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={() => (
          <View style={{ marginBottom: 10 }}>
            <PostOverview post={post} disabled />

          </View>
        )}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
      />
      <PostForm handleSubmit={handleSubmit} />
    </KeyboardAvoidingView >
  );
}
