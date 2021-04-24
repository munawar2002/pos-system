import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosSystemTestModule } from '../../../test.module';
import { PurchaseOrderBreakdownComponent } from 'app/entities/purchase-order-breakdown/purchase-order-breakdown.component';
import { PurchaseOrderBreakdownService } from 'app/entities/purchase-order-breakdown/purchase-order-breakdown.service';
import { PurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';

describe('Component Tests', () => {
  describe('PurchaseOrderBreakdown Management Component', () => {
    let comp: PurchaseOrderBreakdownComponent;
    let fixture: ComponentFixture<PurchaseOrderBreakdownComponent>;
    let service: PurchaseOrderBreakdownService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [PurchaseOrderBreakdownComponent],
      })
        .overrideTemplate(PurchaseOrderBreakdownComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchaseOrderBreakdownComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchaseOrderBreakdownService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PurchaseOrderBreakdown(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.purchaseOrderBreakdowns && comp.purchaseOrderBreakdowns[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
