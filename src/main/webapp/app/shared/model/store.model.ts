import { Moment } from 'moment';

export interface IStore {
  id?: number;
  name?: string;
  address?: string;
  managedBy?: number;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
}

export const defaultValue: Readonly<IStore> = {
  active: false,
};
