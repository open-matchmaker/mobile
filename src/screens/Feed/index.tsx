import React, { useCallback, useEffect, useState } from "react";
import { View, Button, FlatList, KeyboardAvoidingView, Platform } from "react-native";

import { Post } from '../../schemas/post';
import PostService from '../../services/Post.Service';

import useApp from "../../hooks/useApp";
import PostOverview from "../../components/PostOverview";
import PostForm from "../../components/PostForm";

export default function Feed() {
  const { logout } = useApp();
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = useCallback(async () => {
    const posts = await PostService.getAll();

    setPosts(posts);
  }, []);

  const handleSubmit = useCallback(async (content) => {
    if (content.length === 0) return;

    await PostService.create(content);

    loadPosts();
  }, []);

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <Button onPress={() => logout()} title='logout' />
      <FlatList<Post>
        removeClippedSubviews={false}
        data={posts}
        keyExtractor={(post) => `${post.id}`}
        renderItem={({ item }) => (
          <PostOverview post={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={() => (
          <View style={{ marginBottom: 10 }}>
            <PostForm handleSubmit={handleSubmit} />
          </View>
        )}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
      />
    </KeyboardAvoidingView >
  );
}
