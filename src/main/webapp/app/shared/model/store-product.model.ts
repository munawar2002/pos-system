import { Moment } from 'moment';

export interface IStoreProduct {
  id?: number;
  productId?: number;
  storeId?: number;
  quantity?: number;
  createdBy?: string;
  createdDate?: Moment;
}

export class StoreProduct implements IStoreProduct {
  constructor(
    public id?: number,
    public productId?: number,
    public storeId?: number,
    public quantity?: number,
    public createdBy?: string,
    public createdDate?: Moment
  ) {}
}
