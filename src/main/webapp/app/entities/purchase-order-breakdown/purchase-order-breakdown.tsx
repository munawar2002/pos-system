import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './purchase-order-breakdown.reducer';
import { IPurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseOrderBreakdownProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PurchaseOrderBreakdown = (props: IPurchaseOrderBreakdownProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { purchaseOrderBreakdownList, match, loading } = props;
  return (
    <div>
      <h2 id="purchase-order-breakdown-heading">
        Purchase Order Breakdowns
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Purchase Order Breakdown
        </Link>
      </h2>
      <div className="table-responsive">
        {purchaseOrderBreakdownList && purchaseOrderBreakdownList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Purchase Order Id</th>
                <th>Product Id</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {purchaseOrderBreakdownList.map((purchaseOrderBreakdown, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${purchaseOrderBreakdown.id}`} color="link" size="sm">
                      {purchaseOrderBreakdown.id}
                    </Button>
                  </td>
                  <td>{purchaseOrderBreakdown.purchaseOrderId}</td>
                  <td>{purchaseOrderBreakdown.productId}</td>
                  <td>{purchaseOrderBreakdown.quantity}</td>
                  <td>{purchaseOrderBreakdown.unitPrice}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${purchaseOrderBreakdown.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${purchaseOrderBreakdown.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${purchaseOrderBreakdown.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Purchase Order Breakdowns found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ purchaseOrderBreakdown }: IRootState) => ({
  purchaseOrderBreakdownList: purchaseOrderBreakdown.entities,
  loading: purchaseOrderBreakdown.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderBreakdown);
