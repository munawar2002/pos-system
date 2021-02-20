import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductCompany } from 'app/shared/model/product-company.model';

type EntityResponseType = HttpResponse<IProductCompany>;
type EntityArrayResponseType = HttpResponse<IProductCompany[]>;

@Injectable({ providedIn: 'root' })
export class ProductCompanyService {
  public resourceUrl = SERVER_API_URL + 'api/product-companies';

  constructor(protected http: HttpClient) {}

  create(productCompany: IProductCompany): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productCompany);
    return this.http
      .post<IProductCompany>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productCompany: IProductCompany): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productCompany);
    return this.http
      .put<IProductCompany>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProductCompany>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductCompany[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(productCompany: IProductCompany): IProductCompany {
    const copy: IProductCompany = Object.assign({}, productCompany, {
      createdDate:
        productCompany.createdDate && productCompany.createdDate.isValid() ? productCompany.createdDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((productCompany: IProductCompany) => {
        productCompany.createdDate = productCompany.createdDate ? moment(productCompany.createdDate) : undefined;
      });
    }
    return res;
  }
}
