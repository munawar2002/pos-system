import { Moment } from 'moment';

export interface IProductCategory {
  id?: number;
  name?: string;
  createdBy?: string;
  creationDate?: string;
}

export const defaultValue: Readonly<IProductCategory> = {};
