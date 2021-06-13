import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './supplier.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupplierProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Supplier = (props: ISupplierProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { supplierList, match, loading } = props;
  return (
    <div>
      <h2 id="supplier-heading">
        Suppliers
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Supplier
        </Link>
      </h2>
      <div className="table-responsive">
        {supplierList && supplierList.length > 0 ? (
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
              {supplierList.map((supplier, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${supplier.id}`} color="link" size="sm">
                      {supplier.id}
                    </Button>
                  </td>
                  <td>{supplier.name}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.contactNo}</td>
                  <td>{supplier.contactPerson}</td>
                  <td>{supplier.contactPersonNo}</td>
                  <td>{supplier.createdBy}</td>
                  <td>
                    {supplier.createdDate ? <TextFormat type="date" value={supplier.createdDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${supplier.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${supplier.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${supplier.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Suppliers found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ supplier }: IRootState) => ({
  supplierList: supplier.entities,
  loading: supplier.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
