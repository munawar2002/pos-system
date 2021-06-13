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
  createdDate?: string;
}

export const defaultValue: Readonly<IEmployee> = {};
