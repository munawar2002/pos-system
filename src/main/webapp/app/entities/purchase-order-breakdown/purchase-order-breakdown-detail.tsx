import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './purchase-order-breakdown.reducer';
import { IPurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseOrderBreakdownDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseOrderBreakdownDetail = (props: IPurchaseOrderBreakdownDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { purchaseOrderBreakdownEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PurchaseOrderBreakdown [<b>{purchaseOrderBreakdownEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="purchaseOrderId">Purchase Order Id</span>
          </dt>
          <dd>{purchaseOrderBreakdownEntity.purchaseOrderId}</dd>
          <dt>
            <span id="productId">Product Id</span>
          </dt>
          <dd>{purchaseOrderBreakdownEntity.productId}</dd>
          <dt>
            <span id="quantity">Quantity</span>
          </dt>
          <dd>{purchaseOrderBreakdownEntity.quantity}</dd>
          <dt>
            <span id="unitPrice">Unit Price</span>
          </dt>
          <dd>{purchaseOrderBreakdownEntity.unitPrice}</dd>
        </dl>
        <Button tag={Link} to="/purchase-order-breakdown" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/purchase-order-breakdown/${purchaseOrderBreakdownEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ purchaseOrderBreakdown }: IRootState) => ({
  purchaseOrderBreakdownEntity: purchaseOrderBreakdown.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderBreakdownDetail);
