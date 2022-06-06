import { User } from "../schemas/user";
import {SignUpDto} from "../schemas/session"
import api from "./api";

export default {
  async whoami() {
    const response = await api.get<User>('/user/whoami');
    return response.data;
  },
  async signUp(values:SignUpDto){
    const response = await api.post('/user',values)
    return response
  }
}
