import { User } from "../schemas/user";

import api from "./api";

export default {
  async whoami() {
    const response = await api.get<User>('/user/whoami');
    return response.data;
  }
}
