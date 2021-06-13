import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './purchase-invoice.reducer';
import { IPurchaseInvoice } from 'app/shared/model/purchase-invoice.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseInvoiceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PurchaseInvoice = (props: IPurchaseInvoiceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { purchaseInvoiceList, match, loading } = props;
  return (
    <div>
      <h2 id="purchase-invoice-heading">
        Purchase Invoices
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Purchase Invoice
        </Link>
      </h2>
      <div className="table-responsive">
        {purchaseInvoiceList && purchaseInvoiceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier Id</th>
                <th>Payment Type</th>
                <th>Purchase Order Id</th>
                <th>Invoice Status</th>
                <th>Paid Amount</th>
                <th>Total Amount</th>
                <th>Tendered Amount</th>
                <th>Discount Availed</th>
                <th>Discount Percentage</th>
                <th>Discount Amount</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {purchaseInvoiceList.map((purchaseInvoice, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${purchaseInvoice.id}`} color="link" size="sm">
                      {purchaseInvoice.id}
                    </Button>
                  </td>
                  <td>{purchaseInvoice.supplierId}</td>
                  <td>{purchaseInvoice.paymentType}</td>
                  <td>{purchaseInvoice.purchaseOrderId}</td>
                  <td>{purchaseInvoice.invoiceStatus}</td>
                  <td>{purchaseInvoice.paidAmount}</td>
                  <td>{purchaseInvoice.totalAmount}</td>
                  <td>{purchaseInvoice.tenderedAmount}</td>
                  <td>{purchaseInvoice.discountAvailed ? 'true' : 'false'}</td>
                  <td>{purchaseInvoice.discountPercentage}</td>
                  <td>{purchaseInvoice.discountAmount}</td>
                  <td>{purchaseInvoice.createdBy}</td>
                  <td>
                    {purchaseInvoice.createdDate ? (
                      <TextFormat type="date" value={purchaseInvoice.createdDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${purchaseInvoice.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${purchaseInvoice.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${purchaseInvoice.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Purchase Invoices found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ purchaseInvoice }: IRootState) => ({
  purchaseInvoiceList: purchaseInvoice.entities,
  loading: purchaseInvoice.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseInvoice);
