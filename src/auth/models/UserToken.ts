export interface UserToken {
  access_token: string;
  sub: number;
  email: string;
  name: string;
  profile?: 'ADM' | 'USER';
}
