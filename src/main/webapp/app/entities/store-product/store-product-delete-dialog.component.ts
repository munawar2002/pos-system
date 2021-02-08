import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStoreProduct } from 'app/shared/model/store-product.model';
import { StoreProductService } from './store-product.service';

@Component({
  templateUrl: './store-product-delete-dialog.component.html',
})
export class StoreProductDeleteDialogComponent {
  storeProduct?: IStoreProduct;

  constructor(
    protected storeProductService: StoreProductService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.storeProductService.delete(id).subscribe(() => {
      this.eventManager.broadcast('storeProductListModification');
      this.activeModal.close();
    });
  }
}
