import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './store-product.reducer';
import { IStoreProduct } from 'app/shared/model/store-product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStoreProductProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const StoreProduct = (props: IStoreProductProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { storeProductList, match, loading } = props;
  return (
    <div>
      <h2 id="store-product-heading">
        Store Products
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Store Product
        </Link>
      </h2>
      <div className="table-responsive">
        {storeProductList && storeProductList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Id</th>
                <th>Store Id</th>
                <th>Quantity</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {storeProductList.map((storeProduct, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${storeProduct.id}`} color="link" size="sm">
                      {storeProduct.id}
                    </Button>
                  </td>
                  <td>{storeProduct.productId}</td>
                  <td>{storeProduct.storeId}</td>
                  <td>{storeProduct.quantity}</td>
                  <td>{storeProduct.createdBy}</td>
                  <td>
                    {storeProduct.createdDate ? (
                      <TextFormat type="date" value={storeProduct.createdDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${storeProduct.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${storeProduct.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${storeProduct.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Store Products found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ storeProduct }: IRootState) => ({
  storeProductList: storeProduct.entities,
  loading: storeProduct.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StoreProduct);
