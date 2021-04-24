import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPurchaseOrderBreakdown, PurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';
import { PurchaseOrderBreakdownService } from './purchase-order-breakdown.service';
import { PurchaseOrderBreakdownComponent } from './purchase-order-breakdown.component';
import { PurchaseOrderBreakdownDetailComponent } from './purchase-order-breakdown-detail.component';
import { PurchaseOrderBreakdownUpdateComponent } from './purchase-order-breakdown-update.component';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderBreakdownResolve implements Resolve<IPurchaseOrderBreakdown> {
  constructor(private service: PurchaseOrderBreakdownService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchaseOrderBreakdown> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((purchaseOrderBreakdown: HttpResponse<PurchaseOrderBreakdown>) => {
          if (purchaseOrderBreakdown.body) {
            return of(purchaseOrderBreakdown.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PurchaseOrderBreakdown());
  }
}

export const purchaseOrderBreakdownRoute: Routes = [
  {
    path: '',
    component: PurchaseOrderBreakdownComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseOrderBreakdowns',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchaseOrderBreakdownDetailComponent,
    resolve: {
      purchaseOrderBreakdown: PurchaseOrderBreakdownResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseOrderBreakdowns',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchaseOrderBreakdownUpdateComponent,
    resolve: {
      purchaseOrderBreakdown: PurchaseOrderBreakdownResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseOrderBreakdowns',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchaseOrderBreakdownUpdateComponent,
    resolve: {
      purchaseOrderBreakdown: PurchaseOrderBreakdownResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseOrderBreakdowns',
    },
    canActivate: [UserRouteAccessService],
  },
];
