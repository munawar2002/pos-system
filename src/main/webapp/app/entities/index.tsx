import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProductCategory from './product-category';
import Employee from './employee';
import Store from './store';
import Supplier from './supplier';
import Product from './product';
import StoreProduct from './store-product';
import ProductCompany from './product-company';
import PurchaseOrder from './purchase-order';
import PurchaseOrderBreakdown from './purchase-order-breakdown';
import PurchaseInvoice from './purchase-invoice';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}product-category`} component={ProductCategory} />
      <ErrorBoundaryRoute path={`${match.url}employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}store`} component={Store} />
      <ErrorBoundaryRoute path={`${match.url}supplier`} component={Supplier} />
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}store-product`} component={StoreProduct} />
      <ErrorBoundaryRoute path={`${match.url}product-company`} component={ProductCompany} />
      <ErrorBoundaryRoute path={`${match.url}purchase-order`} component={PurchaseOrder} />
      <ErrorBoundaryRoute path={`${match.url}purchase-order-breakdown`} component={PurchaseOrderBreakdown} />
      <ErrorBoundaryRoute path={`${match.url}purchase-invoice`} component={PurchaseInvoice} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
