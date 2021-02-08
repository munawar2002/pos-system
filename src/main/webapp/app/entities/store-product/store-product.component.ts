import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStoreProduct } from 'app/shared/model/store-product.model';
import { StoreProductService } from './store-product.service';
import { StoreProductDeleteDialogComponent } from './store-product-delete-dialog.component';

@Component({
  selector: 'jhi-store-product',
  templateUrl: './store-product.component.html',
})
export class StoreProductComponent implements OnInit, OnDestroy {
  storeProducts?: IStoreProduct[];
  eventSubscriber?: Subscription;

  constructor(
    protected storeProductService: StoreProductService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.storeProductService.query().subscribe((res: HttpResponse<IStoreProduct[]>) => (this.storeProducts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStoreProducts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStoreProduct): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStoreProducts(): void {
    this.eventSubscriber = this.eventManager.subscribe('storeProductListModification', () => this.loadAll());
  }

  delete(storeProduct: IStoreProduct): void {
    const modalRef = this.modalService.open(StoreProductDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.storeProduct = storeProduct;
  }
}
