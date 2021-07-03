import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './store.reducer';
import { IStore } from 'app/shared/model/store.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStoreProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Store = (props: IStoreProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { storeList, match, loading } = props;
  return (
    <div>
      <h2 id="store-heading">
        Stores
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Store
        </Link>
      </h2>
      <div className="table-responsive">
        {storeList && storeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Managed By</th>
                <th>Active</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {storeList.map((store, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${store.id}`} color="link" size="sm">
                      {store.id}
                    </Button>
                  </td>
                  <td>{store.name}</td>
                  <td>{store.address}</td>
                  <td>{(store.managedBy as any).firstName}</td>
                  <td>{store.active ? 'true' : 'false'}</td>
                  <td>{store.createdBy}</td>
                  <td>{store.createdDate ? <TextFormat type="date" value={store.createdDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${store.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${store.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${store.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Stores found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ store }: IRootState) => ({
  storeList: store.entities,
  loading: store.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Store);
