import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosSystemTestModule } from '../../../test.module';
import { StoreProductComponent } from 'app/entities/store-product/store-product.component';
import { StoreProductService } from 'app/entities/store-product/store-product.service';
import { StoreProduct } from 'app/shared/model/store-product.model';

describe('Component Tests', () => {
  describe('StoreProduct Management Component', () => {
    let comp: StoreProductComponent;
    let fixture: ComponentFixture<StoreProductComponent>;
    let service: StoreProductService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [StoreProductComponent],
      })
        .overrideTemplate(StoreProductComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StoreProductComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StoreProductService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StoreProduct(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.storeProducts && comp.storeProducts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
