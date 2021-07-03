import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PurchaseOrderBreakdown from './purchase-order-breakdown';
import PurchaseOrderBreakdownDetail from './purchase-order-breakdown-detail';
import PurchaseOrderBreakdownUpdate from './purchase-order-breakdown-update';
import PurchaseOrderBreakdownDeleteDialog from './purchase-order-breakdown-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PurchaseOrderBreakdownUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PurchaseOrderBreakdownUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PurchaseOrderBreakdownDetail} />
      <ErrorBoundaryRoute path={match.url} component={PurchaseOrderBreakdown} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PurchaseOrderBreakdownDeleteDialog} />
  </>
);

export default Routes;
