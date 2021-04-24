import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPurchaseInvoice, PurchaseInvoice } from 'app/shared/model/purchase-invoice.model';
import { PurchaseInvoiceService } from './purchase-invoice.service';
import { PurchaseInvoiceComponent } from './purchase-invoice.component';
import { PurchaseInvoiceDetailComponent } from './purchase-invoice-detail.component';
import { PurchaseInvoiceUpdateComponent } from './purchase-invoice-update.component';

@Injectable({ providedIn: 'root' })
export class PurchaseInvoiceResolve implements Resolve<IPurchaseInvoice> {
  constructor(private service: PurchaseInvoiceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchaseInvoice> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((purchaseInvoice: HttpResponse<PurchaseInvoice>) => {
          if (purchaseInvoice.body) {
            return of(purchaseInvoice.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PurchaseInvoice());
  }
}

export const purchaseInvoiceRoute: Routes = [
  {
    path: '',
    component: PurchaseInvoiceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseInvoices',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchaseInvoiceDetailComponent,
    resolve: {
      purchaseInvoice: PurchaseInvoiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseInvoices',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchaseInvoiceUpdateComponent,
    resolve: {
      purchaseInvoice: PurchaseInvoiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseInvoices',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchaseInvoiceUpdateComponent,
    resolve: {
      purchaseInvoice: PurchaseInvoiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseInvoices',
    },
    canActivate: [UserRouteAccessService],
  },
];
