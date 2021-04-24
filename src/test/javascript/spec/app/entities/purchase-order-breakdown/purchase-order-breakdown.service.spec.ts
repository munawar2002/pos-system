import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PurchaseOrderBreakdownService } from 'app/entities/purchase-order-breakdown/purchase-order-breakdown.service';
import { IPurchaseOrderBreakdown, PurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';

describe('Service Tests', () => {
  describe('PurchaseOrderBreakdown Service', () => {
    let injector: TestBed;
    let service: PurchaseOrderBreakdownService;
    let httpMock: HttpTestingController;
    let elemDefault: IPurchaseOrderBreakdown;
    let expectedResult: IPurchaseOrderBreakdown | IPurchaseOrderBreakdown[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PurchaseOrderBreakdownService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PurchaseOrderBreakdown(0, 0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PurchaseOrderBreakdown', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PurchaseOrderBreakdown()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PurchaseOrderBreakdown', () => {
        const returnedFromService = Object.assign(
          {
            purchaseOrderId: 1,
            productId: 1,
            quantity: 1,
            unitPrice: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PurchaseOrderBreakdown', () => {
        const returnedFromService = Object.assign(
          {
            purchaseOrderId: 1,
            productId: 1,
            quantity: 1,
            unitPrice: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PurchaseOrderBreakdown', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
