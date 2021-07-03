import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './store-product.reducer';
import { IStoreProduct } from 'app/shared/model/store-product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStoreProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StoreProductDetail = (props: IStoreProductDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { storeProductEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          StoreProduct [<b>{storeProductEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="productId">Product Id</span>
          </dt>
          <dd>{storeProductEntity.productId}</dd>
          <dt>
            <span id="storeId">Store Id</span>
          </dt>
          <dd>{storeProductEntity.storeId}</dd>
          <dt>
            <span id="quantity">Quantity</span>
          </dt>
          <dd>{storeProductEntity.quantity}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{storeProductEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {storeProductEntity.createdDate ? (
              <TextFormat value={storeProductEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/store-product" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/store-product/${storeProductEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ storeProduct }: IRootState) => ({
  storeProductEntity: storeProduct.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StoreProductDetail);
