import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PosSystemTestModule } from '../../../test.module';
import { PurchaseOrderBreakdownUpdateComponent } from 'app/entities/purchase-order-breakdown/purchase-order-breakdown-update.component';
import { PurchaseOrderBreakdownService } from 'app/entities/purchase-order-breakdown/purchase-order-breakdown.service';
import { PurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';

describe('Component Tests', () => {
  describe('PurchaseOrderBreakdown Management Update Component', () => {
    let comp: PurchaseOrderBreakdownUpdateComponent;
    let fixture: ComponentFixture<PurchaseOrderBreakdownUpdateComponent>;
    let service: PurchaseOrderBreakdownService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [PurchaseOrderBreakdownUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PurchaseOrderBreakdownUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchaseOrderBreakdownUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchaseOrderBreakdownService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PurchaseOrderBreakdown(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PurchaseOrderBreakdown();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
