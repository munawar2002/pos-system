import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductCompany } from 'app/shared/model/product-company.model';
import { ProductCompanyService } from './product-company.service';
import { ProductCompanyDeleteDialogComponent } from './product-company-delete-dialog.component';

@Component({
  selector: 'jhi-product-company',
  templateUrl: './product-company.component.html',
})
export class ProductCompanyComponent implements OnInit, OnDestroy {
  productCompanies?: IProductCompany[];
  eventSubscriber?: Subscription;

  constructor(
    protected productCompanyService: ProductCompanyService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productCompanyService.query().subscribe((res: HttpResponse<IProductCompany[]>) => (this.productCompanies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductCompanies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductCompany): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductCompanies(): void {
    this.eventSubscriber = this.eventManager.subscribe('productCompanyListModification', () => this.loadAll());
  }

  delete(productCompany: IProductCompany): void {
    const modalRef = this.modalService.open(ProductCompanyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productCompany = productCompany;
  }
}
