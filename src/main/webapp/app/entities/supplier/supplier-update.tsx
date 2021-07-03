import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './supplier.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISupplierUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupplierUpdate = (props: ISupplierUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { supplierEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/supplier');
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
        ...supplierEntity,
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
          <h2 id="posSystemApp.supplier.home.createOrEditLabel">Create or edit a Supplier</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : supplierEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="supplier-id">ID</Label>
                  <AvInput id="supplier-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="supplier-name">
                  Name
                </Label>
                <AvField
                  id="supplier-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="supplier-address">
                  Address
                </Label>
                <AvField id="supplier-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="contactNoLabel" for="supplier-contactNo">
                  Contact No
                </Label>
                <AvField id="supplier-contactNo" type="text" name="contactNo" />
              </AvGroup>
              <AvGroup>
                <Label id="contactPersonLabel" for="supplier-contactPerson">
                  Contact Person
                </Label>
                <AvField id="supplier-contactPerson" type="text" name="contactPerson" />
              </AvGroup>
              <AvGroup>
                <Label id="contactPersonNoLabel" for="supplier-contactPersonNo">
                  Contact Person No
                </Label>
                <AvField id="supplier-contactPersonNo" type="text" name="contactPersonNo" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="supplier-createdBy">
                  Created By
                </Label>
                <AvField id="supplier-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="supplier-createdDate">
                  Created Date
                </Label>
                <AvField id="supplier-createdDate" type="date" className="form-control" name="createdDate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/supplier" replace color="info">
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
  supplierEntity: storeState.supplier.entity,
  loading: storeState.supplier.loading,
  updating: storeState.supplier.updating,
  updateSuccess: storeState.supplier.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupplierUpdate);
