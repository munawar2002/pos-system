import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './purchase-order.reducer';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseOrderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseOrderDetail = (props: IPurchaseOrderDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { purchaseOrderEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PurchaseOrder [<b>{purchaseOrderEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="supplierId">Supplier Id</span>
          </dt>
          <dd>{purchaseOrderEntity.supplierId}</dd>
          <dt>
            <span id="totalAmount">Total Amount</span>
          </dt>
          <dd>{purchaseOrderEntity.totalAmount}</dd>
          <dt>
            <span id="paymentType">Payment Type</span>
          </dt>
          <dd>{purchaseOrderEntity.paymentType}</dd>
          <dt>
            <span id="orderStatus">Order Status</span>
          </dt>
          <dd>{purchaseOrderEntity.orderStatus}</dd>
          <dt>
            <span id="paymentStatus">Payment Status</span>
          </dt>
          <dd>{purchaseOrderEntity.paymentStatus}</dd>
          <dt>
            <span id="shippingDate">Shipping Date</span>
          </dt>
          <dd>
            {purchaseOrderEntity.shippingDate ? (
              <TextFormat value={purchaseOrderEntity.shippingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="shippingRequired">Shipping Required</span>
          </dt>
          <dd>{purchaseOrderEntity.shippingRequired ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {purchaseOrderEntity.createdDate ? (
              <TextFormat value={purchaseOrderEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{purchaseOrderEntity.createdBy}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{purchaseOrderEntity.remarks}</dd>
        </dl>
        <Button tag={Link} to="/purchase-order" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/purchase-order/${purchaseOrderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ purchaseOrder }: IRootState) => ({
  purchaseOrderEntity: purchaseOrder.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderDetail);
