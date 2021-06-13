import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductDetail = (props: IProductDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Product [<b>{productEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{productEntity.code}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{productEntity.name}</dd>
          <dt>
            <span id="categoryId">Category Id</span>
          </dt>
          <dd>{productEntity.categoryId}</dd>
          <dt>
            <span id="supplierId">Supplier Id</span>
          </dt>
          <dd>{productEntity.supplierId}</dd>
          <dt>
            <span id="buyPrice">Buy Price</span>
          </dt>
          <dd>{productEntity.buyPrice}</dd>
          <dt>
            <span id="sellPrice">Sell Price</span>
          </dt>
          <dd>{productEntity.sellPrice}</dd>
          <dt>
            <span id="photo">Photo</span>
          </dt>
          <dd>
            {productEntity.photo ? (
              <div>
                {productEntity.photoContentType ? (
                  <a onClick={openFile(productEntity.photoContentType, productEntity.photo)}>
                    <img src={`data:${productEntity.photoContentType};base64,${productEntity.photo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {productEntity.photoContentType}, {byteSize(productEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{productEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {productEntity.createdDate ? <TextFormat value={productEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ product }: IRootState) => ({
  productEntity: product.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
