import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './purchase-invoice.reducer';
import { IPurchaseInvoice } from 'app/shared/model/purchase-invoice.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPurchaseInvoiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseInvoiceUpdate = (props: IPurchaseInvoiceUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { purchaseInvoiceEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/purchase-invoice');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...purchaseInvoiceEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="posSystemApp.purchaseInvoice.home.createOrEditLabel">Create or edit a PurchaseInvoice</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : purchaseInvoiceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="purchase-invoice-id">ID</Label>
                  <AvInput id="purchase-invoice-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="supplierIdLabel" for="purchase-invoice-supplierId">
                  Supplier Id
                </Label>
                <AvField id="purchase-invoice-supplierId" type="string" className="form-control" name="supplierId" />
              </AvGroup>
              <AvGroup>
                <Label id="paymentTypeLabel" for="purchase-invoice-paymentType">
                  Payment Type
                </Label>
                <AvInput
                  id="purchase-invoice-paymentType"
                  type="select"
                  className="form-control"
                  name="paymentType"
                  value={(!isNew && purchaseInvoiceEntity.paymentType) || 'CREDIT'}
                >
                  <option value="CREDIT">CREDIT</option>
                  <option value="CASH">CASH</option>
                  <option value="PARTIAL">PARTIAL</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="purchaseOrderIdLabel" for="purchase-invoice-purchaseOrderId">
                  Purchase Order Id
                </Label>
                <AvField id="purchase-invoice-purchaseOrderId" type="string" className="form-control" name="purchaseOrderId" />
              </AvGroup>
              <AvGroup>
                <Label id="invoiceStatusLabel" for="purchase-invoice-invoiceStatus">
                  Invoice Status
                </Label>
                <AvInput
                  id="purchase-invoice-invoiceStatus"
                  type="select"
                  className="form-control"
                  name="invoiceStatus"
                  value={(!isNew && purchaseInvoiceEntity.invoiceStatus) || 'COMPLETED'}
                >
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="INPROGRESS">INPROGRESS</option>
                  <option value="FAILED">FAILED</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="PAYMENT_DUE">PAYMENT_DUE</option>
                  <option value="REFUNDED">REFUNDED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="paidAmountLabel" for="purchase-invoice-paidAmount">
                  Paid Amount
                </Label>
                <AvField id="purchase-invoice-paidAmount" type="string" className="form-control" name="paidAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="totalAmountLabel" for="purchase-invoice-totalAmount">
                  Total Amount
                </Label>
                <AvField id="purchase-invoice-totalAmount" type="string" className="form-control" name="totalAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="tenderedAmountLabel" for="purchase-invoice-tenderedAmount">
                  Tendered Amount
                </Label>
                <AvField id="purchase-invoice-tenderedAmount" type="string" className="form-control" name="tenderedAmount" />
              </AvGroup>
              <AvGroup check>
                <Label id="discountAvailedLabel">
                  <AvInput id="purchase-invoice-discountAvailed" type="checkbox" className="form-check-input" name="discountAvailed" />
                  Discount Availed
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="discountPercentageLabel" for="purchase-invoice-discountPercentage">
                  Discount Percentage
                </Label>
                <AvField id="purchase-invoice-discountPercentage" type="string" className="form-control" name="discountPercentage" />
              </AvGroup>
              <AvGroup>
                <Label id="discountAmountLabel" for="purchase-invoice-discountAmount">
                  Discount Amount
                </Label>
                <AvField id="purchase-invoice-discountAmount" type="string" className="form-control" name="discountAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="purchase-invoice-createdBy">
                  Created By
                </Label>
                <AvField id="purchase-invoice-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="purchase-invoice-createdDate">
                  Created Date
                </Label>
                <AvField id="purchase-invoice-createdDate" type="date" className="form-control" name="createdDate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/purchase-invoice" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  purchaseInvoiceEntity: storeState.purchaseInvoice.entity,
  loading: storeState.purchaseInvoice.loading,
  updating: storeState.purchaseInvoice.updating,
  updateSuccess: storeState.purchaseInvoice.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseInvoiceUpdate);
