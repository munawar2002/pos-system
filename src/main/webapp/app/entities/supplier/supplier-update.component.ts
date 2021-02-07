import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISupplier, Supplier } from 'app/shared/model/supplier.model';
import { SupplierService } from './supplier.service';

@Component({
  selector: 'jhi-supplier-update',
  templateUrl: './supplier-update.component.html',
})
export class SupplierUpdateComponent implements OnInit {
  isSaving = false;
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    address: [],
    contactNo: [],
    contactPerson: [],
    contactPersonNo: [],
    createdBy: [],
    createdDate: [],
  });

  constructor(protected supplierService: SupplierService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplier }) => {
      this.updateForm(supplier);
    });
  }

  updateForm(supplier: ISupplier): void {
    this.editForm.patchValue({
      id: supplier.id,
      name: supplier.name,
      address: supplier.address,
      contactNo: supplier.contactNo,
      contactPerson: supplier.contactPerson,
      contactPersonNo: supplier.contactPersonNo,
      createdBy: supplier.createdBy,
      createdDate: supplier.createdDate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supplier = this.createFromForm();
    if (supplier.id !== undefined) {
      this.subscribeToSaveResponse(this.supplierService.update(supplier));
    } else {
      this.subscribeToSaveResponse(this.supplierService.create(supplier));
    }
  }

  private createFromForm(): ISupplier {
    return {
      ...new Supplier(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      address: this.editForm.get(['address'])!.value,
      contactNo: this.editForm.get(['contactNo'])!.value,
      contactPerson: this.editForm.get(['contactPerson'])!.value,
      contactPersonNo: this.editForm.get(['contactPersonNo'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplier>>): void {
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
