import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSystemSharedModule } from 'app/shared/shared.module';
import { PurchaseInvoiceComponent } from './purchase-invoice.component';
import { PurchaseInvoiceDetailComponent } from './purchase-invoice-detail.component';
import { PurchaseInvoiceUpdateComponent } from './purchase-invoice-update.component';
import { PurchaseInvoiceDeleteDialogComponent } from './purchase-invoice-delete-dialog.component';
import { purchaseInvoiceRoute } from './purchase-invoice.route';

@NgModule({
  imports: [PosSystemSharedModule, RouterModule.forChild(purchaseInvoiceRoute)],
  declarations: [
    PurchaseInvoiceComponent,
    PurchaseInvoiceDetailComponent,
    PurchaseInvoiceUpdateComponent,
    PurchaseInvoiceDeleteDialogComponent,
  ],
  entryComponents: [PurchaseInvoiceDeleteDialogComponent],
})
export class PosSystemPurchaseInvoiceModule {}
