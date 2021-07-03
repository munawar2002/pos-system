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
  createdDate?: string;
}

export const defaultValue: Readonly<IPurchaseInvoice> = {
  discountAvailed: false,
};
