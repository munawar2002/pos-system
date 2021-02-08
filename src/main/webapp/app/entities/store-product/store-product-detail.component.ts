import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStoreProduct } from 'app/shared/model/store-product.model';

@Component({
  selector: 'jhi-store-product-detail',
  templateUrl: './store-product-detail.component.html',
})
export class StoreProductDetailComponent implements OnInit {
  storeProduct: IStoreProduct | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ storeProduct }) => (this.storeProduct = storeProduct));
  }

  previousState(): void {
    window.history.back();
  }
}
