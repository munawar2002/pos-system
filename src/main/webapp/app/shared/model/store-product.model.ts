import { Moment } from 'moment';

export interface IStoreProduct {
  id?: number;
  productId?: number;
  storeId?: number;
  quantity?: number;
  createdBy?: string;
  createdDate?: string;
}

export const defaultValue: Readonly<IStoreProduct> = {};
