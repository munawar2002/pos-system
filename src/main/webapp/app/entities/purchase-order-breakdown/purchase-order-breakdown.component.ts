import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';
import { PurchaseOrderBreakdownService } from './purchase-order-breakdown.service';
import { PurchaseOrderBreakdownDeleteDialogComponent } from './purchase-order-breakdown-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-order-breakdown',
  templateUrl: './purchase-order-breakdown.component.html',
})
export class PurchaseOrderBreakdownComponent implements OnInit, OnDestroy {
  purchaseOrderBreakdowns?: IPurchaseOrderBreakdown[];
  eventSubscriber?: Subscription;

  constructor(
    protected purchaseOrderBreakdownService: PurchaseOrderBreakdownService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.purchaseOrderBreakdownService
      .query()
      .subscribe((res: HttpResponse<IPurchaseOrderBreakdown[]>) => (this.purchaseOrderBreakdowns = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPurchaseOrderBreakdowns();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPurchaseOrderBreakdown): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPurchaseOrderBreakdowns(): void {
    this.eventSubscriber = this.eventManager.subscribe('purchaseOrderBreakdownListModification', () => this.loadAll());
  }

  delete(purchaseOrderBreakdown: IPurchaseOrderBreakdown): void {
    const modalRef = this.modalService.open(PurchaseOrderBreakdownDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchaseOrderBreakdown = purchaseOrderBreakdown;
  }
}
