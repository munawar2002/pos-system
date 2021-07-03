import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './purchase-order-breakdown.reducer';

export interface IPurchaseOrderBreakdownDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseOrderBreakdownDeleteDialog = (props: IPurchaseOrderBreakdownDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/purchase-order-breakdown');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.purchaseOrderBreakdownEntity.id);
  };

  const { purchaseOrderBreakdownEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody id="posSystemApp.purchaseOrderBreakdown.delete.question">
        Are you sure you want to delete this PurchaseOrderBreakdown?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-purchaseOrderBreakdown" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ purchaseOrderBreakdown }: IRootState) => ({
  purchaseOrderBreakdownEntity: purchaseOrderBreakdown.entity,
  updateSuccess: purchaseOrderBreakdown.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderBreakdownDeleteDialog);
