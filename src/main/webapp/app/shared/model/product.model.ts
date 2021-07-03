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
  createdDate?: string;
}

export const defaultValue: Readonly<IProduct> = {};
