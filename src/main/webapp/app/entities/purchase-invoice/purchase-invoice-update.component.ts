import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPurchaseInvoice, PurchaseInvoice } from 'app/shared/model/purchase-invoice.model';
import { PurchaseInvoiceService } from './purchase-invoice.service';

@Component({
  selector: 'jhi-purchase-invoice-update',
  templateUrl: './purchase-invoice-update.component.html',
})
export class PurchaseInvoiceUpdateComponent implements OnInit {
  isSaving = false;
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    supplierId: [],
    paymentType: [],
    purchaseOrderId: [],
    invoiceStatus: [],
    paidAmount: [],
    totalAmount: [],
    tenderedAmount: [],
    discountAvailed: [],
    discountPercentage: [],
    discountAmount: [],
    createdBy: [],
    createdDate: [],
  });

  constructor(
    protected purchaseInvoiceService: PurchaseInvoiceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseInvoice }) => {
      this.updateForm(purchaseInvoice);
    });
  }

  updateForm(purchaseInvoice: IPurchaseInvoice): void {
    this.editForm.patchValue({
      id: purchaseInvoice.id,
      supplierId: purchaseInvoice.supplierId,
      paymentType: purchaseInvoice.paymentType,
      purchaseOrderId: purchaseInvoice.purchaseOrderId,
      invoiceStatus: purchaseInvoice.invoiceStatus,
      paidAmount: purchaseInvoice.paidAmount,
      totalAmount: purchaseInvoice.totalAmount,
      tenderedAmount: purchaseInvoice.tenderedAmount,
      discountAvailed: purchaseInvoice.discountAvailed,
      discountPercentage: purchaseInvoice.discountPercentage,
      discountAmount: purchaseInvoice.discountAmount,
      createdBy: purchaseInvoice.createdBy,
      createdDate: purchaseInvoice.createdDate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchaseInvoice = this.createFromForm();
    if (purchaseInvoice.id !== undefined) {
      this.subscribeToSaveResponse(this.purchaseInvoiceService.update(purchaseInvoice));
    } else {
      this.subscribeToSaveResponse(this.purchaseInvoiceService.create(purchaseInvoice));
    }
  }

  private createFromForm(): IPurchaseInvoice {
    return {
      ...new PurchaseInvoice(),
      id: this.editForm.get(['id'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
      paymentType: this.editForm.get(['paymentType'])!.value,
      purchaseOrderId: this.editForm.get(['purchaseOrderId'])!.value,
      invoiceStatus: this.editForm.get(['invoiceStatus'])!.value,
      paidAmount: this.editForm.get(['paidAmount'])!.value,
      totalAmount: this.editForm.get(['totalAmount'])!.value,
      tenderedAmount: this.editForm.get(['tenderedAmount'])!.value,
      discountAvailed: this.editForm.get(['discountAvailed'])!.value,
      discountPercentage: this.editForm.get(['discountPercentage'])!.value,
      discountAmount: this.editForm.get(['discountAmount'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseInvoice>>): void {
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
