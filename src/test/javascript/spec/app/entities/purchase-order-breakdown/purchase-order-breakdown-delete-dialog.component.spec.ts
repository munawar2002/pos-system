import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PosSystemTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { PurchaseOrderBreakdownDeleteDialogComponent } from 'app/entities/purchase-order-breakdown/purchase-order-breakdown-delete-dialog.component';
import { PurchaseOrderBreakdownService } from 'app/entities/purchase-order-breakdown/purchase-order-breakdown.service';

describe('Component Tests', () => {
  describe('PurchaseOrderBreakdown Management Delete Component', () => {
    let comp: PurchaseOrderBreakdownDeleteDialogComponent;
    let fixture: ComponentFixture<PurchaseOrderBreakdownDeleteDialogComponent>;
    let service: PurchaseOrderBreakdownService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [PurchaseOrderBreakdownDeleteDialogComponent],
      })
        .overrideTemplate(PurchaseOrderBreakdownDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchaseOrderBreakdownDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchaseOrderBreakdownService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
