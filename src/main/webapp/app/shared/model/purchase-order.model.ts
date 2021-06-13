import { Moment } from 'moment';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';

export interface IPurchaseOrder {
  id?: number;
  supplierId?: number;
  totalAmount?: number;
  paymentType?: PaymentType;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  shippingDate?: string;
  shippingRequired?: boolean;
  createdDate?: string;
  createdBy?: string;
  remarks?: string;
}

export const defaultValue: Readonly<IPurchaseOrder> = {
  shippingRequired: false,
};
