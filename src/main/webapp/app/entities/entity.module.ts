import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product-category',
        loadChildren: () => import('./product-category/product-category.module').then(m => m.PosSystemProductCategoryModule),
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.PosSystemEmployeeModule),
      },
      {
        path: 'store',
        loadChildren: () => import('./store/store.module').then(m => m.PosSystemStoreModule),
      },
      {
        path: 'supplier',
        loadChildren: () => import('./supplier/supplier.module').then(m => m.PosSystemSupplierModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.PosSystemProductModule),
      },
      {
        path: 'store-product',
        loadChildren: () => import('./store-product/store-product.module').then(m => m.PosSystemStoreProductModule),
      },
      {
        path: 'product-company',
        loadChildren: () => import('./product-company/product-company.module').then(m => m.PosSystemProductCompanyModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class PosSystemEntityModule {}
