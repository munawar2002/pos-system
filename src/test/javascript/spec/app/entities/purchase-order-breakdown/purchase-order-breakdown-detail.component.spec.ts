import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PosSystemTestModule } from '../../../test.module';
import { PurchaseOrderBreakdownDetailComponent } from 'app/entities/purchase-order-breakdown/purchase-order-breakdown-detail.component';
import { PurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';

describe('Component Tests', () => {
  describe('PurchaseOrderBreakdown Management Detail Component', () => {
    let comp: PurchaseOrderBreakdownDetailComponent;
    let fixture: ComponentFixture<PurchaseOrderBreakdownDetailComponent>;
    const route = ({ data: of({ purchaseOrderBreakdown: new PurchaseOrderBreakdown(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [PurchaseOrderBreakdownDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PurchaseOrderBreakdownDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchaseOrderBreakdownDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load purchaseOrderBreakdown on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purchaseOrderBreakdown).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
