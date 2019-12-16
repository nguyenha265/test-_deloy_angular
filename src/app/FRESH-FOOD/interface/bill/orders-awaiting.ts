import {User} from '../user/user';
import {Order} from './order';

export interface OrdersAwaiting {
  id?: number;
  user: User;
  date: Date;
  status: string;
  orderItem: Order;
  total: number;
}
