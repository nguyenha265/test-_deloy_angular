import {Role} from './role';

export interface UserOnline {
  username?: string;
  password?: string;
  authorities?: Role[];
  accessToken?: string;
}
