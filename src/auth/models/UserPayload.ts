export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  profile?: 'ADM' | 'USER';
  iat?: number;
  exp?: number;
}
