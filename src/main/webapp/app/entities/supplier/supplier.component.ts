import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupplier } from 'app/shared/model/supplier.model';
import { SupplierService } from './supplier.service';
import { SupplierDeleteDialogComponent } from './supplier-delete-dialog.component';

@Component({
  selector: 'jhi-supplier',
  templateUrl: './supplier.component.html',
})
export class SupplierComponent implements OnInit, OnDestroy {
  suppliers?: ISupplier[];
  eventSubscriber?: Subscription;

  constructor(protected supplierService: SupplierService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.supplierService.query().subscribe((res: HttpResponse<ISupplier[]>) => (this.suppliers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSuppliers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISupplier): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSuppliers(): void {
    this.eventSubscriber = this.eventManager.subscribe('supplierListModification', () => this.loadAll());
  }

  delete(supplier: ISupplier): void {
    const modalRef = this.modalService.open(SupplierDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supplier = supplier;
  }
}
