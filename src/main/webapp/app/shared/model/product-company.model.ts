import { Moment } from 'moment';

export interface IProductCompany {
  id?: number;
  name?: string;
  address?: string;
  contactNo?: string;
  contactPerson?: string;
  contactPersonNo?: string;
  createdBy?: string;
  createdDate?: string;
}

export const defaultValue: Readonly<IProductCompany> = {};
