import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PosSystemTestModule } from '../../../test.module';
import { ProductCompanyUpdateComponent } from 'app/entities/product-company/product-company-update.component';
import { ProductCompanyService } from 'app/entities/product-company/product-company.service';
import { ProductCompany } from 'app/shared/model/product-company.model';

describe('Component Tests', () => {
  describe('ProductCompany Management Update Component', () => {
    let comp: ProductCompanyUpdateComponent;
    let fixture: ComponentFixture<ProductCompanyUpdateComponent>;
    let service: ProductCompanyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [ProductCompanyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProductCompanyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductCompanyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductCompanyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductCompany(123);
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
        const entity = new ProductCompany();
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
