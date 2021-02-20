import { Moment } from 'moment';

export interface IProductCompany {
  id?: number;
  name?: string;
  address?: string;
  contactNo?: string;
  contactPerson?: string;
  contactPersonNo?: string;
  createdBy?: string;
  createdDate?: Moment;
}

export class ProductCompany implements IProductCompany {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public contactNo?: string,
    public contactPerson?: string,
    public contactPersonNo?: string,
    public createdBy?: string,
    public createdDate?: Moment
  ) {}
}
