import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosSystemTestModule } from '../../../test.module';
import { ProductCompanyComponent } from 'app/entities/product-company/product-company.component';
import { ProductCompanyService } from 'app/entities/product-company/product-company.service';
import { ProductCompany } from 'app/shared/model/product-company.model';

describe('Component Tests', () => {
  describe('ProductCompany Management Component', () => {
    let comp: ProductCompanyComponent;
    let fixture: ComponentFixture<ProductCompanyComponent>;
    let service: ProductCompanyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [ProductCompanyComponent],
      })
        .overrideTemplate(ProductCompanyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductCompanyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductCompanyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductCompany(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productCompanies && comp.productCompanies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
