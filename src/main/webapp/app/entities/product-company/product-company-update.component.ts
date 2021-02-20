import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductCompany, ProductCompany } from 'app/shared/model/product-company.model';
import { ProductCompanyService } from './product-company.service';

@Component({
  selector: 'jhi-product-company-update',
  templateUrl: './product-company-update.component.html',
})
export class ProductCompanyUpdateComponent implements OnInit {
  isSaving = false;
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    address: [],
    contactNo: [],
    contactPerson: [],
    contactPersonNo: [],
    createdBy: [],
    createdDate: [],
  });

  constructor(protected productCompanyService: ProductCompanyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productCompany }) => {
      this.updateForm(productCompany);
    });
  }

  updateForm(productCompany: IProductCompany): void {
    this.editForm.patchValue({
      id: productCompany.id,
      name: productCompany.name,
      address: productCompany.address,
      contactNo: productCompany.contactNo,
      contactPerson: productCompany.contactPerson,
      contactPersonNo: productCompany.contactPersonNo,
      createdBy: productCompany.createdBy,
      createdDate: productCompany.createdDate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productCompany = this.createFromForm();
    if (productCompany.id !== undefined) {
      this.subscribeToSaveResponse(this.productCompanyService.update(productCompany));
    } else {
      this.subscribeToSaveResponse(this.productCompanyService.create(productCompany));
    }
  }

  private createFromForm(): IProductCompany {
    return {
      ...new ProductCompany(),
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductCompany>>): void {
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
