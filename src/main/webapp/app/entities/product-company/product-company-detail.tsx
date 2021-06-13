import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product-company.reducer';
import { IProductCompany } from 'app/shared/model/product-company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductCompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductCompanyDetail = (props: IProductCompanyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productCompanyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ProductCompany [<b>{productCompanyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{productCompanyEntity.name}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{productCompanyEntity.address}</dd>
          <dt>
            <span id="contactNo">Contact No</span>
          </dt>
          <dd>{productCompanyEntity.contactNo}</dd>
          <dt>
            <span id="contactPerson">Contact Person</span>
          </dt>
          <dd>{productCompanyEntity.contactPerson}</dd>
          <dt>
            <span id="contactPersonNo">Contact Person No</span>
          </dt>
          <dd>{productCompanyEntity.contactPersonNo}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{productCompanyEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {productCompanyEntity.createdDate ? (
              <TextFormat value={productCompanyEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/product-company" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product-company/${productCompanyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ productCompany }: IRootState) => ({
  productCompanyEntity: productCompany.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompanyDetail);
