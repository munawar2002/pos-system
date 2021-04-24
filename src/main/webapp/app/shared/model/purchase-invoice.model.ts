import { Moment } from 'moment';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IPurchaseInvoice {
  id?: number;
  supplierId?: number;
  paymentType?: PaymentType;
  purchaseOrderId?: number;
  invoiceStatus?: OrderStatus;
  paidAmount?: number;
  totalAmount?: number;
  tenderedAmount?: number;
  discountAvailed?: boolean;
  discountPercentage?: number;
  discountAmount?: number;
  createdBy?: string;
  createdDate?: Moment;
}

export class PurchaseInvoice implements IPurchaseInvoice {
  constructor(
    public id?: number,
    public supplierId?: number,
    public paymentType?: PaymentType,
    public purchaseOrderId?: number,
    public invoiceStatus?: OrderStatus,
    public paidAmount?: number,
    public totalAmount?: number,
    public tenderedAmount?: number,
    public discountAvailed?: boolean,
    public discountPercentage?: number,
    public discountAmount?: number,
    public createdBy?: string,
    public createdDate?: Moment
  ) {
    this.discountAvailed = this.discountAvailed || false;
  }
}
