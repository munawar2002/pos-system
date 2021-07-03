import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeDetail = (props: IEmployeeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Employee [<b>{employeeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">First Name</span>
          </dt>
          <dd>{employeeEntity.firstName}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{employeeEntity.lastName}</dd>
          <dt>
            <span id="fullName">Full Name</span>
          </dt>
          <dd>{employeeEntity.fullName}</dd>
          <dt>
            <span id="jhiUserId">Jhi User Id</span>
          </dt>
          <dd>{employeeEntity.jhiUserId}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{employeeEntity.address}</dd>
          <dt>
            <span id="mobileNo">Mobile No</span>
          </dt>
          <dd>{employeeEntity.mobileNo}</dd>
          <dt>
            <span id="designation">Designation</span>
          </dt>
          <dd>{employeeEntity.designation}</dd>
          <dt>
            <span id="photo">Photo</span>
          </dt>
          <dd>
            {employeeEntity.photo ? (
              <div>
                {employeeEntity.photoContentType ? (
                  <a onClick={openFile(employeeEntity.photoContentType, employeeEntity.photo)}>
                    <img src={`data:${employeeEntity.photoContentType};base64,${employeeEntity.photo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {employeeEntity.photoContentType}, {byteSize(employeeEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{employeeEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {employeeEntity.createdDate ? (
              <TextFormat value={employeeEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/employee" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee/${employeeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeEntity: employee.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
