import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';

@Component({
  selector: 'jhi-purchase-order-breakdown-detail',
  templateUrl: './purchase-order-breakdown-detail.component.html',
})
export class PurchaseOrderBreakdownDetailComponent implements OnInit {
  purchaseOrderBreakdown: IPurchaseOrderBreakdown | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseOrderBreakdown }) => (this.purchaseOrderBreakdown = purchaseOrderBreakdown));
  }

  previousState(): void {
    window.history.back();
  }
}
