import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './purchase-order-breakdown.reducer';
import { IPurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPurchaseOrderBreakdownUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseOrderBreakdownUpdate = (props: IPurchaseOrderBreakdownUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { purchaseOrderBreakdownEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/purchase-order-breakdown');
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
        ...purchaseOrderBreakdownEntity,
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
          <h2 id="posSystemApp.purchaseOrderBreakdown.home.createOrEditLabel">Create or edit a PurchaseOrderBreakdown</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : purchaseOrderBreakdownEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="purchase-order-breakdown-id">ID</Label>
                  <AvInput id="purchase-order-breakdown-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="purchaseOrderIdLabel" for="purchase-order-breakdown-purchaseOrderId">
                  Purchase Order Id
                </Label>
                <AvField id="purchase-order-breakdown-purchaseOrderId" type="string" className="form-control" name="purchaseOrderId" />
              </AvGroup>
              <AvGroup>
                <Label id="productIdLabel" for="purchase-order-breakdown-productId">
                  Product Id
                </Label>
                <AvField id="purchase-order-breakdown-productId" type="string" className="form-control" name="productId" />
              </AvGroup>
              <AvGroup>
                <Label id="quantityLabel" for="purchase-order-breakdown-quantity">
                  Quantity
                </Label>
                <AvField id="purchase-order-breakdown-quantity" type="string" className="form-control" name="quantity" />
              </AvGroup>
              <AvGroup>
                <Label id="unitPriceLabel" for="purchase-order-breakdown-unitPrice">
                  Unit Price
                </Label>
                <AvField id="purchase-order-breakdown-unitPrice" type="string" className="form-control" name="unitPrice" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/purchase-order-breakdown" replace color="info">
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
  purchaseOrderBreakdownEntity: storeState.purchaseOrderBreakdown.entity,
  loading: storeState.purchaseOrderBreakdown.loading,
  updating: storeState.purchaseOrderBreakdown.updating,
  updateSuccess: storeState.purchaseOrderBreakdown.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderBreakdownUpdate);
