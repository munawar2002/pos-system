import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './supplier.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupplierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupplierDetail = (props: ISupplierDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { supplierEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Supplier [<b>{supplierEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{supplierEntity.name}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{supplierEntity.address}</dd>
          <dt>
            <span id="contactNo">Contact No</span>
          </dt>
          <dd>{supplierEntity.contactNo}</dd>
          <dt>
            <span id="contactPerson">Contact Person</span>
          </dt>
          <dd>{supplierEntity.contactPerson}</dd>
          <dt>
            <span id="contactPersonNo">Contact Person No</span>
          </dt>
          <dd>{supplierEntity.contactPersonNo}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{supplierEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {supplierEntity.createdDate ? (
              <TextFormat value={supplierEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/supplier" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/supplier/${supplierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ supplier }: IRootState) => ({
  supplierEntity: supplier.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetail);
