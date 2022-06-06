import { User } from "./user"

export interface Post {
  id: number,
  content: string,
  usersId: number,
  createdAt: string,
  updateAt: string,
  postsId?: number,
  Comments: Post[],
  creator: User
}

export interface PostFormData {
  content: string
  parent?: number
}
