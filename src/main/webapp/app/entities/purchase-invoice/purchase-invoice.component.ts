import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseInvoice } from 'app/shared/model/purchase-invoice.model';
import { PurchaseInvoiceService } from './purchase-invoice.service';
import { PurchaseInvoiceDeleteDialogComponent } from './purchase-invoice-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
})
export class PurchaseInvoiceComponent implements OnInit, OnDestroy {
  purchaseInvoices?: IPurchaseInvoice[];
  eventSubscriber?: Subscription;

  constructor(
    protected purchaseInvoiceService: PurchaseInvoiceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.purchaseInvoiceService.query().subscribe((res: HttpResponse<IPurchaseInvoice[]>) => (this.purchaseInvoices = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPurchaseInvoices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPurchaseInvoice): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPurchaseInvoices(): void {
    this.eventSubscriber = this.eventManager.subscribe('purchaseInvoiceListModification', () => this.loadAll());
  }

  delete(purchaseInvoice: IPurchaseInvoice): void {
    const modalRef = this.modalService.open(PurchaseInvoiceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchaseInvoice = purchaseInvoice;
  }
}
