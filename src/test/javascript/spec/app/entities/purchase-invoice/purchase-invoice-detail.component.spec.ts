import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PosSystemTestModule } from '../../../test.module';
import { PurchaseInvoiceDetailComponent } from 'app/entities/purchase-invoice/purchase-invoice-detail.component';
import { PurchaseInvoice } from 'app/shared/model/purchase-invoice.model';

describe('Component Tests', () => {
  describe('PurchaseInvoice Management Detail Component', () => {
    let comp: PurchaseInvoiceDetailComponent;
    let fixture: ComponentFixture<PurchaseInvoiceDetailComponent>;
    const route = ({ data: of({ purchaseInvoice: new PurchaseInvoice(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [PurchaseInvoiceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PurchaseInvoiceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchaseInvoiceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load purchaseInvoice on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purchaseInvoice).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
