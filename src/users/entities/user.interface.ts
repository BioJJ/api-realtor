export interface UserInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  profile: 'ADM' | 'USER';
  status: 'ACTIVATE' | 'INACTIVATE';
}
