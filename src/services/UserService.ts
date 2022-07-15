import { UpdateDto, User } from "../schemas/user";
import {SignUpDto} from "../schemas/session"
import api from "./api";

export default {
  async whoami() {
    const response = await api.get<User>('/user/whoami');
    return response.data;
  },
  async create(values:SignUpDto){
    const response = await api.post('/user',values)
    return response
  },
  async sendFriendRequest(userId:any){
    const response = await api.post('/user/invite',userId)
    return response
  },
  async acceptFriendRequest(userId:any){
    const response = await api.post('/user/acceptInvite',userId)
    return response
  },
  async rejectFriendRequest(userId:number){
    return null
  },
  async getFriends(){
    
    return null
  },
  async updateProfile(values: UpdateDto){
    const response = await api.patch('/user/update',values)
    return response
  },
  async getUserById(id:number){
    const response = await api.get<User>('/user/findID/'+id)
    return response.data
  }
}