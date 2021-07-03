export interface IPurchaseOrderBreakdown {
  id?: number;
  purchaseOrderId?: number;
  productId?: number;
  quantity?: number;
  unitPrice?: number;
}

export const defaultValue: Readonly<IPurchaseOrderBreakdown> = {};
