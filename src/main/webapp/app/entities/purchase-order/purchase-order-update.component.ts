import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPurchaseOrder, PurchaseOrder } from 'app/shared/model/purchase-order.model';
import { PurchaseOrderService } from './purchase-order.service';

@Component({
  selector: 'jhi-purchase-order-update',
  templateUrl: './purchase-order-update.component.html',
})
export class PurchaseOrderUpdateComponent implements OnInit {
  isSaving = false;
  shippingDateDp: any;
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    supplierId: [],
    totalAmount: [],
    paymentType: [],
    orderStatus: [],
    paymentStatus: [],
    shippingDate: [],
    shippingRequired: [null, [Validators.required]],
    createdDate: [],
    createdBy: [],
    remarks: [],
  });

  constructor(protected purchaseOrderService: PurchaseOrderService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseOrder }) => {
      this.updateForm(purchaseOrder);
    });
  }

  updateForm(purchaseOrder: IPurchaseOrder): void {
    this.editForm.patchValue({
      id: purchaseOrder.id,
      supplierId: purchaseOrder.supplierId,
      totalAmount: purchaseOrder.totalAmount,
      paymentType: purchaseOrder.paymentType,
      orderStatus: purchaseOrder.orderStatus,
      paymentStatus: purchaseOrder.paymentStatus,
      shippingDate: purchaseOrder.shippingDate,
      shippingRequired: purchaseOrder.shippingRequired,
      createdDate: purchaseOrder.createdDate,
      createdBy: purchaseOrder.createdBy,
      remarks: purchaseOrder.remarks,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchaseOrder = this.createFromForm();
    if (purchaseOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.purchaseOrderService.update(purchaseOrder));
    } else {
      this.subscribeToSaveResponse(this.purchaseOrderService.create(purchaseOrder));
    }
  }

  private createFromForm(): IPurchaseOrder {
    return {
      ...new PurchaseOrder(),
      id: this.editForm.get(['id'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
      totalAmount: this.editForm.get(['totalAmount'])!.value,
      paymentType: this.editForm.get(['paymentType'])!.value,
      orderStatus: this.editForm.get(['orderStatus'])!.value,
      paymentStatus: this.editForm.get(['paymentStatus'])!.value,
      shippingDate: this.editForm.get(['shippingDate'])!.value,
      shippingRequired: this.editForm.get(['shippingRequired'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      remarks: this.editForm.get(['remarks'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseOrder>>): void {
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
