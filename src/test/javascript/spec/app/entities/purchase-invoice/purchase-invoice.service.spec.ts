import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PurchaseInvoiceService } from 'app/entities/purchase-invoice/purchase-invoice.service';
import { IPurchaseInvoice, PurchaseInvoice } from 'app/shared/model/purchase-invoice.model';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

describe('Service Tests', () => {
  describe('PurchaseInvoice Service', () => {
    let injector: TestBed;
    let service: PurchaseInvoiceService;
    let httpMock: HttpTestingController;
    let elemDefault: IPurchaseInvoice;
    let expectedResult: IPurchaseInvoice | IPurchaseInvoice[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PurchaseInvoiceService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PurchaseInvoice(0, 0, PaymentType.CREDIT, 0, OrderStatus.COMPLETED, 0, 0, 0, false, 0, 0, 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            createdDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PurchaseInvoice', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate,
          },
          returnedFromService
        );

        service.create(new PurchaseInvoice()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PurchaseInvoice', () => {
        const returnedFromService = Object.assign(
          {
            supplierId: 1,
            paymentType: 'BBBBBB',
            purchaseOrderId: 1,
            invoiceStatus: 'BBBBBB',
            paidAmount: 1,
            totalAmount: 1,
            tenderedAmount: 1,
            discountAvailed: true,
            discountPercentage: 1,
            discountAmount: 1,
            createdBy: 'BBBBBB',
            createdDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PurchaseInvoice', () => {
        const returnedFromService = Object.assign(
          {
            supplierId: 1,
            paymentType: 'BBBBBB',
            purchaseOrderId: 1,
            invoiceStatus: 'BBBBBB',
            paidAmount: 1,
            totalAmount: 1,
            tenderedAmount: 1,
            discountAvailed: true,
            discountPercentage: 1,
            discountAmount: 1,
            createdBy: 'BBBBBB',
            createdDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PurchaseInvoice', () => {
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
