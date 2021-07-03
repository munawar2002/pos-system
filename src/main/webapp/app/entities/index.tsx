import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

// entites
import employee from './employee';
import product from './product';
import productCategory from './product-category';
import productCompany from './product-company';
import purchaseInvoice from './purchase-invoice';
import purchaseOrder from './purchase-order';
import purchaseOrderBreakdown from './purchase-order-breakdown';
import store from './store';
import storeProduct from './store-product';
import supplier from './supplier';

/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      <PrivateRoute path="/employee" component={employee} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/product" component={product} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/product-category" component={productCategory} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/product-company" component={productCompany} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/purchase-invoice" component={purchaseInvoice} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/purchase-order" component={purchaseOrder} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/purchase-order-breakdown" component={purchaseOrderBreakdown} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/store" component={store} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/store-product" component={storeProduct} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/supplier" component={supplier} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
    </Switch>
  </div>
);

export default Routes;
