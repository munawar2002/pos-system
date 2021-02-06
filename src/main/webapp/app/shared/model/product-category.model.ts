import { Moment } from 'moment';

export interface IProductCategory {
  id?: number;
  name?: string;
  createdBy?: string;
  creationDate?: Moment;
}

export class ProductCategory implements IProductCategory {
  constructor(public id?: number, public name?: string, public createdBy?: string, public creationDate?: Moment) {}
}
