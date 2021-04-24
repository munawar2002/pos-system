export interface IPurchaseOrderBreakdown {
  id?: number;
  purchaseOrderId?: number;
  productId?: number;
  quantity?: number;
  unitPrice?: number;
}

export class PurchaseOrderBreakdown implements IPurchaseOrderBreakdown {
  constructor(
    public id?: number,
    public purchaseOrderId?: number,
    public productId?: number,
    public quantity?: number,
    public unitPrice?: number
  ) {}
}
