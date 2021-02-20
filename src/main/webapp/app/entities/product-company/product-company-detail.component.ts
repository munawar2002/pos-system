import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductCompany } from 'app/shared/model/product-company.model';

@Component({
  selector: 'jhi-product-company-detail',
  templateUrl: './product-company-detail.component.html',
})
export class ProductCompanyDetailComponent implements OnInit {
  productCompany: IProductCompany | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productCompany }) => (this.productCompany = productCompany));
  }

  previousState(): void {
    window.history.back();
  }
}
