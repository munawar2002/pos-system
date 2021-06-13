import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './purchase-order.reducer';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPurchaseOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseOrderUpdate = (props: IPurchaseOrderUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { purchaseOrderEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/purchase-order' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...purchaseOrderEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="posSystemApp.purchaseOrder.home.createOrEditLabel">Create or edit a PurchaseOrder</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : purchaseOrderEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="purchase-order-id">ID</Label>
                  <AvInput id="purchase-order-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="supplierIdLabel" for="purchase-order-supplierId">
                  Supplier Id
                </Label>
                <AvField id="purchase-order-supplierId" type="string" className="form-control" name="supplierId" />
              </AvGroup>
              <AvGroup>
                <Label id="totalAmountLabel" for="purchase-order-totalAmount">
                  Total Amount
                </Label>
                <AvField id="purchase-order-totalAmount" type="string" className="form-control" name="totalAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="paymentTypeLabel" for="purchase-order-paymentType">
                  Payment Type
                </Label>
                <AvInput
                  id="purchase-order-paymentType"
                  type="select"
                  className="form-control"
                  name="paymentType"
                  value={(!isNew && purchaseOrderEntity.paymentType) || 'CREDIT'}
                >
                  <option value="CREDIT">CREDIT</option>
                  <option value="CASH">CASH</option>
                  <option value="PARTIAL">PARTIAL</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="orderStatusLabel" for="purchase-order-orderStatus">
                  Order Status
                </Label>
                <AvInput
                  id="purchase-order-orderStatus"
                  type="select"
                  className="form-control"
                  name="orderStatus"
                  value={(!isNew && purchaseOrderEntity.orderStatus) || 'COMPLETED'}
                >
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="INPROGRESS">INPROGRESS</option>
                  <option value="FAILED">FAILED</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="PAYMENT_DUE">PAYMENT_DUE</option>
                  <option value="REFUNDED">REFUNDED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="paymentStatusLabel" for="purchase-order-paymentStatus">
                  Payment Status
                </Label>
                <AvInput
                  id="purchase-order-paymentStatus"
                  type="select"
                  className="form-control"
                  name="paymentStatus"
                  value={(!isNew && purchaseOrderEntity.paymentStatus) || 'PAID'}
                >
                  <option value="PAID">PAID</option>
                  <option value="UNPAID">UNPAID</option>
                  <option value="PARTIAL_PAID">PARTIAL_PAID</option>
                  <option value="REFUNDED">REFUNDED</option>
                  <option value="PARTIAL_REFUNDED">PARTIAL_REFUNDED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="shippingDateLabel" for="purchase-order-shippingDate">
                  Shipping Date
                </Label>
                <AvField id="purchase-order-shippingDate" type="date" className="form-control" name="shippingDate" />
              </AvGroup>
              <AvGroup check>
                <Label id="shippingRequiredLabel">
                  <AvInput id="purchase-order-shippingRequired" type="checkbox" className="form-check-input" name="shippingRequired" />
                  Shipping Required
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="purchase-order-createdDate">
                  Created Date
                </Label>
                <AvField id="purchase-order-createdDate" type="date" className="form-control" name="createdDate" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="purchase-order-createdBy">
                  Created By
                </Label>
                <AvField id="purchase-order-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="purchase-order-remarks">
                  Remarks
                </Label>
                <AvField id="purchase-order-remarks" type="text" name="remarks" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/purchase-order" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  purchaseOrderEntity: storeState.purchaseOrder.entity,
  loading: storeState.purchaseOrder.loading,
  updating: storeState.purchaseOrder.updating,
  updateSuccess: storeState.purchaseOrder.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderUpdate);
