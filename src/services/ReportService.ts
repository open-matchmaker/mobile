import api from "./api"
import { Report } from "../schemas/report";

export default{
    async reportUser(userId:number, reason:Report){
        const response = await api.post('/report/'+userId,reason)
        return response
      }
}