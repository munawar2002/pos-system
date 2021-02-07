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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class PosSystemEntityModule {}
