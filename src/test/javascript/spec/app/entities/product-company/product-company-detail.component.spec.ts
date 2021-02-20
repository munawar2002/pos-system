import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PosSystemTestModule } from '../../../test.module';
import { ProductCompanyDetailComponent } from 'app/entities/product-company/product-company-detail.component';
import { ProductCompany } from 'app/shared/model/product-company.model';

describe('Component Tests', () => {
  describe('ProductCompany Management Detail Component', () => {
    let comp: ProductCompanyDetailComponent;
    let fixture: ComponentFixture<ProductCompanyDetailComponent>;
    const route = ({ data: of({ productCompany: new ProductCompany(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [ProductCompanyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductCompanyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductCompanyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productCompany on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productCompany).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
