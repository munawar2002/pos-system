import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSystemSharedModule } from 'app/shared/shared.module';
import { ProductCompanyComponent } from './product-company.component';
import { ProductCompanyDetailComponent } from './product-company-detail.component';
import { ProductCompanyUpdateComponent } from './product-company-update.component';
import { ProductCompanyDeleteDialogComponent } from './product-company-delete-dialog.component';
import { productCompanyRoute } from './product-company.route';

@NgModule({
  imports: [PosSystemSharedModule, RouterModule.forChild(productCompanyRoute)],
  declarations: [
    ProductCompanyComponent,
    ProductCompanyDetailComponent,
    ProductCompanyUpdateComponent,
    ProductCompanyDeleteDialogComponent,
  ],
  entryComponents: [ProductCompanyDeleteDialogComponent],
})
export class PosSystemProductCompanyModule {}
