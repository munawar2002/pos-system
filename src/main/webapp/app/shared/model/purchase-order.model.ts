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
  shippingDate?: Moment;
  shippingRequired?: boolean;
  createdDate?: Moment;
  createdBy?: string;
  remarks?: string;
}

export class PurchaseOrder implements IPurchaseOrder {
  constructor(
    public id?: number,
    public supplierId?: number,
    public totalAmount?: number,
    public paymentType?: PaymentType,
    public orderStatus?: OrderStatus,
    public paymentStatus?: PaymentStatus,
    public shippingDate?: Moment,
    public shippingRequired?: boolean,
    public createdDate?: Moment,
    public createdBy?: string,
    public remarks?: string
  ) {
    this.shippingRequired = this.shippingRequired || false;
  }
}
