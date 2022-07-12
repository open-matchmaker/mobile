import {Game} from './game';
export interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
  friendUserFriends: User[];
  userFriends: User[];
  playsGames: Game[];
}
export interface UpdateDto {
  bio: string;
}
