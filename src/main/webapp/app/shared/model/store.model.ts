import { Moment } from 'moment';

export interface IStore {
  id?: number;
  name?: string;
  address?: string;
  managedBy?: number;
  active?: boolean;
  createdBy?: string;
  createdDate?: Moment;
}

export class Store implements IStore {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public managedBy?: number,
    public active?: boolean,
    public createdBy?: string,
    public createdDate?: Moment
  ) {
    this.active = this.active || false;
  }
}
