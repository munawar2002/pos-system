import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './store-product.reducer';
import { IStoreProduct } from 'app/shared/model/store-product.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStoreProductUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StoreProductUpdate = (props: IStoreProductUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { storeProductEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/store-product');
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
        ...storeProductEntity,
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
          <h2 id="posSystemApp.storeProduct.home.createOrEditLabel">Create or edit a StoreProduct</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : storeProductEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="store-product-id">ID</Label>
                  <AvInput id="store-product-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="productIdLabel" for="store-product-productId">
                  Product Id
                </Label>
                <AvField id="store-product-productId" type="string" className="form-control" name="productId" />
              </AvGroup>
              <AvGroup>
                <Label id="storeIdLabel" for="store-product-storeId">
                  Store Id
                </Label>
                <AvField id="store-product-storeId" type="string" className="form-control" name="storeId" />
              </AvGroup>
              <AvGroup>
                <Label id="quantityLabel" for="store-product-quantity">
                  Quantity
                </Label>
                <AvField id="store-product-quantity" type="string" className="form-control" name="quantity" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="store-product-createdBy">
                  Created By
                </Label>
                <AvField id="store-product-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="store-product-createdDate">
                  Created Date
                </Label>
                <AvField id="store-product-createdDate" type="date" className="form-control" name="createdDate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/store-product" replace color="info">
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
  storeProductEntity: storeState.storeProduct.entity,
  loading: storeState.storeProduct.loading,
  updating: storeState.storeProduct.updating,
  updateSuccess: storeState.storeProduct.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StoreProductUpdate);
