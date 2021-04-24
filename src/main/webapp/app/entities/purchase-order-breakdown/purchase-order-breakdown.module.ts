import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSystemSharedModule } from 'app/shared/shared.module';
import { PurchaseOrderBreakdownComponent } from './purchase-order-breakdown.component';
import { PurchaseOrderBreakdownDetailComponent } from './purchase-order-breakdown-detail.component';
import { PurchaseOrderBreakdownUpdateComponent } from './purchase-order-breakdown-update.component';
import { PurchaseOrderBreakdownDeleteDialogComponent } from './purchase-order-breakdown-delete-dialog.component';
import { purchaseOrderBreakdownRoute } from './purchase-order-breakdown.route';

@NgModule({
  imports: [PosSystemSharedModule, RouterModule.forChild(purchaseOrderBreakdownRoute)],
  declarations: [
    PurchaseOrderBreakdownComponent,
    PurchaseOrderBreakdownDetailComponent,
    PurchaseOrderBreakdownUpdateComponent,
    PurchaseOrderBreakdownDeleteDialogComponent,
  ],
  entryComponents: [PurchaseOrderBreakdownDeleteDialogComponent],
})
export class PosSystemPurchaseOrderBreakdownModule {}
