import { Moment } from 'moment';

export interface IProduct {
  id?: number;
  code?: string;
  name?: string;
  categoryId?: number;
  supplierId?: number;
  buyPrice?: number;
  sellPrice?: number;
  photoContentType?: string;
  photo?: any;
  createdBy?: string;
  createdDate?: Moment;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public categoryId?: number,
    public supplierId?: number,
    public buyPrice?: number,
    public sellPrice?: number,
    public photoContentType?: string,
    public photo?: any,
    public createdBy?: string,
    public createdDate?: Moment
  ) {}
}
