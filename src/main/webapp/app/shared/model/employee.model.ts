import { Moment } from 'moment';
import { Designation } from 'app/shared/model/enumerations/designation.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  jhiUserId?: number;
  address?: string;
  mobileNo?: string;
  designation?: Designation;
  photoContentType?: string;
  photo?: any;
  createdBy?: string;
  createdDate?: Moment;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public fullName?: string,
    public jhiUserId?: number,
    public address?: string,
    public mobileNo?: string,
    public designation?: Designation,
    public photoContentType?: string,
    public photo?: any,
    public createdBy?: string,
    public createdDate?: Moment
  ) {}
}
