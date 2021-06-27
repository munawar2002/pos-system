import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Employee = (props: IEmployeeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);
  const { employeeList, match, loading } = props;
  return (
    <div>
      <h2 id="employee-heading">
        Employees
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Employee
        </Link>
      </h2>
      <div className="table-responsive">
        {employeeList && employeeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Full Name</th>
                <th>Jhi User Id</th>
                <th>Address</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Photo</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employee.id}`} color="link" size="sm">
                      {employee.id}
                    </Button>
                  </td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.jhiUserId}</td>
                  <td>{employee.address}</td>
                  <td>{employee.mobileNo}</td>
                  <td>{employee.designation}</td>
                  <td>
                    {employee.photo ? (
                      <div>
                        {employee.photoContentType ? (
                          <a onClick={openFile(employee.photoContentType, employee.photo)}>
                            <img src={`data:${employee.photoContentType};base64,${employee.photo}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {employee.photoContentType}, {byteSize(employee.photo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{employee.createdBy}</td>
                  <td>
                    {employee.createdDate ? <TextFormat type="date" value={employee.createdDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employee.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employee.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employee.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Employees found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeList: employee.entities,
  loading: employee.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
