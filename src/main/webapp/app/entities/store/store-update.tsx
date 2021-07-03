import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './store.reducer';
import { IStore } from 'app/shared/model/store.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStoreUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StoreUpdate = (props: IStoreUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { storeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/store');
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
        ...storeEntity,
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
          <h2 id="posSystemApp.store.home.createOrEditLabel">Create or edit a Store</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : storeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="store-id">ID</Label>
                  <AvInput id="store-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="store-name">
                  Name
                </Label>
                <AvField
                  id="store-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="store-address">
                  Address
                </Label>
                <AvField id="store-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="managedByLabel" for="store-managedBy">
                  Managed By
                </Label>
                <AvField id="store-managedBy" type="string" className="form-control" name="managedBy" />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="store-active" type="checkbox" className="form-check-input" name="active" />
                  Active
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="store-createdBy">
                  Created By
                </Label>
                <AvField id="store-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="store-createdDate">
                  Created Date
                </Label>
                <AvField id="store-createdDate" type="date" className="form-control" name="createdDate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/store" replace color="info">
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
  storeEntity: storeState.store.entity,
  loading: storeState.store.loading,
  updating: storeState.store.updating,
  updateSuccess: storeState.store.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StoreUpdate);
