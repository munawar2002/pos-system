import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './store.reducer';
import { IStore } from 'app/shared/model/store.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStoreDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StoreDetail = (props: IStoreDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { storeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Store [<b>{storeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{storeEntity.name}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{storeEntity.address}</dd>
          <dt>
            <span id="managedBy">Managed By</span>
          </dt>
          <dd>{storeEntity.managedBy}</dd>
          <dt>
            <span id="active">Active</span>
          </dt>
          <dd>{storeEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{storeEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {storeEntity.createdDate ? <TextFormat value={storeEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/store" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/store/${storeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ store }: IRootState) => ({
  storeEntity: store.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetail);
