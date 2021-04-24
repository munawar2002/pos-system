import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';
import { PurchaseOrderBreakdownService } from './purchase-order-breakdown.service';

@Component({
  templateUrl: './purchase-order-breakdown-delete-dialog.component.html',
})
export class PurchaseOrderBreakdownDeleteDialogComponent {
  purchaseOrderBreakdown?: IPurchaseOrderBreakdown;

  constructor(
    protected purchaseOrderBreakdownService: PurchaseOrderBreakdownService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchaseOrderBreakdownService.delete(id).subscribe(() => {
      this.eventManager.broadcast('purchaseOrderBreakdownListModification');
      this.activeModal.close();
    });
  }
}
