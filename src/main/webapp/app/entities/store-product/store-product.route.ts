import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStoreProduct, StoreProduct } from 'app/shared/model/store-product.model';
import { StoreProductService } from './store-product.service';
import { StoreProductComponent } from './store-product.component';
import { StoreProductDetailComponent } from './store-product-detail.component';
import { StoreProductUpdateComponent } from './store-product-update.component';

@Injectable({ providedIn: 'root' })
export class StoreProductResolve implements Resolve<IStoreProduct> {
  constructor(private service: StoreProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStoreProduct> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((storeProduct: HttpResponse<StoreProduct>) => {
          if (storeProduct.body) {
            return of(storeProduct.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StoreProduct());
  }
}

export const storeProductRoute: Routes = [
  {
    path: '',
    component: StoreProductComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'StoreProducts',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StoreProductDetailComponent,
    resolve: {
      storeProduct: StoreProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'StoreProducts',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StoreProductUpdateComponent,
    resolve: {
      storeProduct: StoreProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'StoreProducts',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StoreProductUpdateComponent,
    resolve: {
      storeProduct: StoreProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'StoreProducts',
    },
    canActivate: [UserRouteAccessService],
  },
];
