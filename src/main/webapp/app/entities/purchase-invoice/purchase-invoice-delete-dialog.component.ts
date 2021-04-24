import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseInvoice } from 'app/shared/model/purchase-invoice.model';
import { PurchaseInvoiceService } from './purchase-invoice.service';

@Component({
  templateUrl: './purchase-invoice-delete-dialog.component.html',
})
export class PurchaseInvoiceDeleteDialogComponent {
  purchaseInvoice?: IPurchaseInvoice;

  constructor(
    protected purchaseInvoiceService: PurchaseInvoiceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchaseInvoiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('purchaseInvoiceListModification');
      this.activeModal.close();
    });
  }
}
