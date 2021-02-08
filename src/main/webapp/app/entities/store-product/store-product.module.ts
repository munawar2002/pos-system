import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSystemSharedModule } from 'app/shared/shared.module';
import { StoreProductComponent } from './store-product.component';
import { StoreProductDetailComponent } from './store-product-detail.component';
import { StoreProductUpdateComponent } from './store-product-update.component';
import { StoreProductDeleteDialogComponent } from './store-product-delete-dialog.component';
import { storeProductRoute } from './store-product.route';

@NgModule({
  imports: [PosSystemSharedModule, RouterModule.forChild(storeProductRoute)],
  declarations: [StoreProductComponent, StoreProductDetailComponent, StoreProductUpdateComponent, StoreProductDeleteDialogComponent],
  entryComponents: [StoreProductDeleteDialogComponent],
})
export class PosSystemStoreProductModule {}
