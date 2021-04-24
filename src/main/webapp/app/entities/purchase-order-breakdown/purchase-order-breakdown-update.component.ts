import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPurchaseOrderBreakdown, PurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';
import { PurchaseOrderBreakdownService } from './purchase-order-breakdown.service';

@Component({
  selector: 'jhi-purchase-order-breakdown-update',
  templateUrl: './purchase-order-breakdown-update.component.html',
})
export class PurchaseOrderBreakdownUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    purchaseOrderId: [],
    productId: [],
    quantity: [],
    unitPrice: [],
  });

  constructor(
    protected purchaseOrderBreakdownService: PurchaseOrderBreakdownService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseOrderBreakdown }) => {
      this.updateForm(purchaseOrderBreakdown);
    });
  }

  updateForm(purchaseOrderBreakdown: IPurchaseOrderBreakdown): void {
    this.editForm.patchValue({
      id: purchaseOrderBreakdown.id,
      purchaseOrderId: purchaseOrderBreakdown.purchaseOrderId,
      productId: purchaseOrderBreakdown.productId,
      quantity: purchaseOrderBreakdown.quantity,
      unitPrice: purchaseOrderBreakdown.unitPrice,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchaseOrderBreakdown = this.createFromForm();
    if (purchaseOrderBreakdown.id !== undefined) {
      this.subscribeToSaveResponse(this.purchaseOrderBreakdownService.update(purchaseOrderBreakdown));
    } else {
      this.subscribeToSaveResponse(this.purchaseOrderBreakdownService.create(purchaseOrderBreakdown));
    }
  }

  private createFromForm(): IPurchaseOrderBreakdown {
    return {
      ...new PurchaseOrderBreakdown(),
      id: this.editForm.get(['id'])!.value,
      purchaseOrderId: this.editForm.get(['purchaseOrderId'])!.value,
      productId: this.editForm.get(['productId'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseOrderBreakdown>>): void {
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
