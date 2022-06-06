import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "react-native-paper";

export default function PostForm({ handleSubmit }: { handleSubmit: (content: string) => Promise<void> }) {
  const [content, setContent] = useState('');

  const onSubmit = useCallback(async () => {
    await handleSubmit(content);
    setContent('');
  }, [content, handleSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TextInput
        style={{ backgroundColor: '#fff', elevation: 4 }}
        placeholder='Digite algo...'
        value={content}
        onChangeText={(text) => setContent(text)}
        onFocus={() => {
          void 0;
        }}
        right={
          <TextInput.Icon
            name="send"
            onPress={() => onSubmit()}
          />
        }
      />
    </KeyboardAvoidingView>

  );
}
