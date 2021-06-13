import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PurchaseInvoice from './purchase-invoice';
import PurchaseInvoiceDetail from './purchase-invoice-detail';
import PurchaseInvoiceUpdate from './purchase-invoice-update';
import PurchaseInvoiceDeleteDialog from './purchase-invoice-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PurchaseInvoiceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PurchaseInvoiceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PurchaseInvoiceDetail} />
      <ErrorBoundaryRoute path={match.url} component={PurchaseInvoice} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PurchaseInvoiceDeleteDialog} />
  </>
);

export default Routes;
