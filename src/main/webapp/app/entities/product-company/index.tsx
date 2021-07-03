import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProductCompany from './product-company';
import ProductCompanyDetail from './product-company-detail';
import ProductCompanyUpdate from './product-company-update';
import ProductCompanyDeleteDialog from './product-company-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductCompanyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductCompanyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductCompanyDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProductCompany} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProductCompanyDeleteDialog} />
  </>
);

export default Routes;
