import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStoreProduct, StoreProduct } from 'app/shared/model/store-product.model';
import { StoreProductService } from './store-product.service';

@Component({
  selector: 'jhi-store-product-update',
  templateUrl: './store-product-update.component.html',
})
export class StoreProductUpdateComponent implements OnInit {
  isSaving = false;
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    productId: [],
    storeId: [],
    quantity: [],
    createdBy: [],
    createdDate: [],
  });

  constructor(protected storeProductService: StoreProductService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ storeProduct }) => {
      this.updateForm(storeProduct);
    });
  }

  updateForm(storeProduct: IStoreProduct): void {
    this.editForm.patchValue({
      id: storeProduct.id,
      productId: storeProduct.productId,
      storeId: storeProduct.storeId,
      quantity: storeProduct.quantity,
      createdBy: storeProduct.createdBy,
      createdDate: storeProduct.createdDate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const storeProduct = this.createFromForm();
    if (storeProduct.id !== undefined) {
      this.subscribeToSaveResponse(this.storeProductService.update(storeProduct));
    } else {
      this.subscribeToSaveResponse(this.storeProductService.create(storeProduct));
    }
  }

  private createFromForm(): IStoreProduct {
    return {
      ...new StoreProduct(),
      id: this.editForm.get(['id'])!.value,
      productId: this.editForm.get(['productId'])!.value,
      storeId: this.editForm.get(['storeId'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStoreProduct>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
