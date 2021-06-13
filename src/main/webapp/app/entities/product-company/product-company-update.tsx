import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './product-company.reducer';
import { IProductCompany } from 'app/shared/model/product-company.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductCompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductCompanyUpdate = (props: IProductCompanyUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { productCompanyEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/product-company');
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
        ...productCompanyEntity,
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
          <h2 id="posSystemApp.productCompany.home.createOrEditLabel">Create or edit a ProductCompany</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productCompanyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="product-company-id">ID</Label>
                  <AvInput id="product-company-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="product-company-name">
                  Name
                </Label>
                <AvField id="product-company-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="product-company-address">
                  Address
                </Label>
                <AvField id="product-company-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="contactNoLabel" for="product-company-contactNo">
                  Contact No
                </Label>
                <AvField id="product-company-contactNo" type="text" name="contactNo" />
              </AvGroup>
              <AvGroup>
                <Label id="contactPersonLabel" for="product-company-contactPerson">
                  Contact Person
                </Label>
                <AvField id="product-company-contactPerson" type="text" name="contactPerson" />
              </AvGroup>
              <AvGroup>
                <Label id="contactPersonNoLabel" for="product-company-contactPersonNo">
                  Contact Person No
                </Label>
                <AvField id="product-company-contactPersonNo" type="text" name="contactPersonNo" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="product-company-createdBy">
                  Created By
                </Label>
                <AvField id="product-company-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="product-company-createdDate">
                  Created Date
                </Label>
                <AvField id="product-company-createdDate" type="date" className="form-control" name="createdDate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/product-company" replace color="info">
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
  productCompanyEntity: storeState.productCompany.entity,
  loading: storeState.productCompany.loading,
  updating: storeState.productCompany.updating,
  updateSuccess: storeState.productCompany.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompanyUpdate);
