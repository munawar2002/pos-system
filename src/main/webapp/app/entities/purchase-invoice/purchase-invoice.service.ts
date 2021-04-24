import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPurchaseInvoice } from 'app/shared/model/purchase-invoice.model';

type EntityResponseType = HttpResponse<IPurchaseInvoice>;
type EntityArrayResponseType = HttpResponse<IPurchaseInvoice[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseInvoiceService {
  public resourceUrl = SERVER_API_URL + 'api/purchase-invoices';

  constructor(protected http: HttpClient) {}

  create(purchaseInvoice: IPurchaseInvoice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchaseInvoice);
    return this.http
      .post<IPurchaseInvoice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(purchaseInvoice: IPurchaseInvoice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchaseInvoice);
    return this.http
      .put<IPurchaseInvoice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPurchaseInvoice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPurchaseInvoice[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(purchaseInvoice: IPurchaseInvoice): IPurchaseInvoice {
    const copy: IPurchaseInvoice = Object.assign({}, purchaseInvoice, {
      createdDate:
        purchaseInvoice.createdDate && purchaseInvoice.createdDate.isValid() ? purchaseInvoice.createdDate.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((purchaseInvoice: IPurchaseInvoice) => {
        purchaseInvoice.createdDate = purchaseInvoice.createdDate ? moment(purchaseInvoice.createdDate) : undefined;
      });
    }
    return res;
  }
}
