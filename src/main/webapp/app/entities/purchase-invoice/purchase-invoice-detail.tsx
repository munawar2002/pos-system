import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './purchase-invoice.reducer';
import { IPurchaseInvoice } from 'app/shared/model/purchase-invoice.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseInvoiceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseInvoiceDetail = (props: IPurchaseInvoiceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { purchaseInvoiceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PurchaseInvoice [<b>{purchaseInvoiceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="supplierId">Supplier Id</span>
          </dt>
          <dd>{purchaseInvoiceEntity.supplierId}</dd>
          <dt>
            <span id="paymentType">Payment Type</span>
          </dt>
          <dd>{purchaseInvoiceEntity.paymentType}</dd>
          <dt>
            <span id="purchaseOrderId">Purchase Order Id</span>
          </dt>
          <dd>{purchaseInvoiceEntity.purchaseOrderId}</dd>
          <dt>
            <span id="invoiceStatus">Invoice Status</span>
          </dt>
          <dd>{purchaseInvoiceEntity.invoiceStatus}</dd>
          <dt>
            <span id="paidAmount">Paid Amount</span>
          </dt>
          <dd>{purchaseInvoiceEntity.paidAmount}</dd>
          <dt>
            <span id="totalAmount">Total Amount</span>
          </dt>
          <dd>{purchaseInvoiceEntity.totalAmount}</dd>
          <dt>
            <span id="tenderedAmount">Tendered Amount</span>
          </dt>
          <dd>{purchaseInvoiceEntity.tenderedAmount}</dd>
          <dt>
            <span id="discountAvailed">Discount Availed</span>
          </dt>
          <dd>{purchaseInvoiceEntity.discountAvailed ? 'true' : 'false'}</dd>
          <dt>
            <span id="discountPercentage">Discount Percentage</span>
          </dt>
          <dd>{purchaseInvoiceEntity.discountPercentage}</dd>
          <dt>
            <span id="discountAmount">Discount Amount</span>
          </dt>
          <dd>{purchaseInvoiceEntity.discountAmount}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{purchaseInvoiceEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {purchaseInvoiceEntity.createdDate ? (
              <TextFormat value={purchaseInvoiceEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/purchase-invoice" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/purchase-invoice/${purchaseInvoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ purchaseInvoice }: IRootState) => ({
  purchaseInvoiceEntity: purchaseInvoice.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseInvoiceDetail);
