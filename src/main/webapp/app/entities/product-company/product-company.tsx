import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './product-company.reducer';
import { IProductCompany } from 'app/shared/model/product-company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductCompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProductCompany = (props: IProductCompanyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { productCompanyList, match, loading } = props;
  return (
    <div>
      <h2 id="product-company-heading">
        Product Companies
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Product Company
        </Link>
      </h2>
      <div className="table-responsive">
        {productCompanyList && productCompanyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact No</th>
                <th>Contact Person</th>
                <th>Contact Person No</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productCompanyList.map((productCompany, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${productCompany.id}`} color="link" size="sm">
                      {productCompany.id}
                    </Button>
                  </td>
                  <td>{productCompany.name}</td>
                  <td>{productCompany.address}</td>
                  <td>{productCompany.contactNo}</td>
                  <td>{productCompany.contactPerson}</td>
                  <td>{productCompany.contactPersonNo}</td>
                  <td>{productCompany.createdBy}</td>
                  <td>
                    {productCompany.createdDate ? (
                      <TextFormat type="date" value={productCompany.createdDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${productCompany.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productCompany.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productCompany.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Product Companies found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ productCompany }: IRootState) => ({
  productCompanyList: productCompany.entities,
  loading: productCompany.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompany);
