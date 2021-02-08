import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PosSystemTestModule } from '../../../test.module';
import { StoreProductDetailComponent } from 'app/entities/store-product/store-product-detail.component';
import { StoreProduct } from 'app/shared/model/store-product.model';

describe('Component Tests', () => {
  describe('StoreProduct Management Detail Component', () => {
    let comp: StoreProductDetailComponent;
    let fixture: ComponentFixture<StoreProductDetailComponent>;
    const route = ({ data: of({ storeProduct: new StoreProduct(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PosSystemTestModule],
        declarations: [StoreProductDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(StoreProductDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StoreProductDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load storeProduct on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.storeProduct).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
