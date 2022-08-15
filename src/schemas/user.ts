import {Game} from './game';
export interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
  friendUserFriends: [];
  userFriends: [];
  playsGames: Game[];
}
export interface UpdateDto {
  bio: string;
}
