import { Post } from "../schemas/post";

import api from "./api";

export default {
  async getById(id: number) {
    const { data } = await api.get<Post>(`/post/${id}`);
    return data;
  },

  async getAll() {
    const response = await api.get<Post[]>('/post');

    return response.data;
  },

  async create(content: string, parent?: number) {
    const response = await api.post<Post>('/post', { content, parent });

    return response.data;
  }
}
