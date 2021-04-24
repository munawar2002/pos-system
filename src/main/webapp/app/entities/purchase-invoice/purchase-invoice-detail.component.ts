import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseInvoice } from 'app/shared/model/purchase-invoice.model';

@Component({
  selector: 'jhi-purchase-invoice-detail',
  templateUrl: './purchase-invoice-detail.component.html',
})
export class PurchaseInvoiceDetailComponent implements OnInit {
  purchaseInvoice: IPurchaseInvoice | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseInvoice }) => (this.purchaseInvoice = purchaseInvoice));
  }

  previousState(): void {
    window.history.back();
  }
}
