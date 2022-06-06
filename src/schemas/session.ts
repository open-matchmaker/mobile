export interface LoginDto {
  email: string;
  password: string;
}

export interface SignUpDto{
  username: string;
  email: string;
  password: string;
}

export interface Session {
  token: string;
}
