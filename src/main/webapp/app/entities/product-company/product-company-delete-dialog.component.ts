import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductCompany } from 'app/shared/model/product-company.model';
import { ProductCompanyService } from './product-company.service';

@Component({
  templateUrl: './product-company-delete-dialog.component.html',
})
export class ProductCompanyDeleteDialogComponent {
  productCompany?: IProductCompany;

  constructor(
    protected productCompanyService: ProductCompanyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productCompanyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productCompanyListModification');
      this.activeModal.close();
    });
  }
}
