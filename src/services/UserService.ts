import { User } from "../schemas/user";
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
  async sendFriendRequest(userId:number){
    const response = await api.post('/invite',userId)
    return response
  },
  async acceptFriendRequest(userId:number){
    const response = await api.post('/acceptInvite',userId)
    return response
  },
  async rejectFriendRequest(userId:number){
    return null
  },
  async getFriends(){
    
    return null
  }
}