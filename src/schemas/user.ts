export interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
  friendUserFriends: User[];
  userFriends: User[];
  playsGames: string[];
}
