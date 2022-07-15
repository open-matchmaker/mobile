import { Game } from "../schemas/game";
import api from "./api";

export default {
    async getAllGames() {
        const response = await api.get<Game[]>('/game');
        return response.data;
    },
    async createGame(values:any) {
        const response = await api.post('/game', values);
        return response;
    },
    async addGameToUser(gameId: any) {
        const response = await api.patch('/game/add', gameId);
        return response;
    },
    async getGameByName(name: string) {
        const response = await api.get<Game[]>('/game/' + name);
        return response;
    }
};
