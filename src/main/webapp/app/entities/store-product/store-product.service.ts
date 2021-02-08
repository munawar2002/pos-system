import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStoreProduct } from 'app/shared/model/store-product.model';

type EntityResponseType = HttpResponse<IStoreProduct>;
type EntityArrayResponseType = HttpResponse<IStoreProduct[]>;

@Injectable({ providedIn: 'root' })
export class StoreProductService {
  public resourceUrl = SERVER_API_URL + 'api/store-products';

  constructor(protected http: HttpClient) {}

  create(storeProduct: IStoreProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(storeProduct);
    return this.http
      .post<IStoreProduct>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(storeProduct: IStoreProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(storeProduct);
    return this.http
      .put<IStoreProduct>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStoreProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStoreProduct[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(storeProduct: IStoreProduct): IStoreProduct {
    const copy: IStoreProduct = Object.assign({}, storeProduct, {
      createdDate:
        storeProduct.createdDate && storeProduct.createdDate.isValid() ? storeProduct.createdDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((storeProduct: IStoreProduct) => {
        storeProduct.createdDate = storeProduct.createdDate ? moment(storeProduct.createdDate) : undefined;
      });
    }
    return res;
  }
}
