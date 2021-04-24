import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosSystemTestModule } from '../../../test.module';
import { PurchaseInvoiceComponent } from 'app/entities/purchase-invoice/purchase-invoice.component';
import { PurchaseInvoiceService } from 'app/entities/purchase-invoice/purchase-invoice.service';
import { PurchaseInvoice } from 'app/shared/model/purchase-invoice.model';

describe('Component Tests', () => {
  describe('PurchaseInvoice Management Component', () => {
    let comp: PurchaseInvoiceComponent;
    let fixture: ComponentFixture<PurchaseInvoiceComponent>;
    let service: PurchaseInvoiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [PurchaseInvoiceComponent],
      })
        .overrideTemplate(PurchaseInvoiceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchaseInvoiceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchaseInvoiceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PurchaseInvoice(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.purchaseInvoices && comp.purchaseInvoices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
