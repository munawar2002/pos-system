import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISupplier } from 'app/shared/model/supplier.model';

type EntityResponseType = HttpResponse<ISupplier>;
type EntityArrayResponseType = HttpResponse<ISupplier[]>;

@Injectable({ providedIn: 'root' })
export class SupplierService {
  public resourceUrl = SERVER_API_URL + 'api/suppliers';

  constructor(protected http: HttpClient) {}

  create(supplier: ISupplier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supplier);
    return this.http
      .post<ISupplier>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(supplier: ISupplier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supplier);
    return this.http
      .put<ISupplier>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISupplier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISupplier[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(supplier: ISupplier): ISupplier {
    const copy: ISupplier = Object.assign({}, supplier, {
      createdDate: supplier.createdDate && supplier.createdDate.isValid() ? supplier.createdDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((supplier: ISupplier) => {
        supplier.createdDate = supplier.createdDate ? moment(supplier.createdDate) : undefined;
      });
    }
    return res;
  }
}
