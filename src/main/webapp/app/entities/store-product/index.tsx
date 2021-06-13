import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StoreProduct from './store-product';
import StoreProductDetail from './store-product-detail';
import StoreProductUpdate from './store-product-update';
import StoreProductDeleteDialog from './store-product-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StoreProductUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StoreProductUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StoreProductDetail} />
      <ErrorBoundaryRoute path={match.url} component={StoreProduct} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={StoreProductDeleteDialog} />
  </>
);

export default Routes;
