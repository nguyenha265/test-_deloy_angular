import {Category} from './category';
import {Picture} from './picture';
import {Provider} from './provider';

export interface Product {
  id?: number;
  name: string;
  category: Category;
  amount: number;
  picture: Picture[];
  description: string;
  price: number;
  origin: string;
  provider: Provider;
  status: boolean;
  total?: number;
}
