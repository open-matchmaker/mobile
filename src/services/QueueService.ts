import api from "./api"




export class QueueService{

    public inQueue:boolean = false;


    async joinQueue(id:number){
        this.inQueue = true
        return this.inQueue
    }
    
    async leaveQueue(id:number){
        this.inQueue = false
        return this.inQueue
        }

    async getQueue(){
        const response = await api.get('/queue')
        return response
        }
}
