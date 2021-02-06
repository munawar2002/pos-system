import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductCategory } from 'app/shared/model/product-category.model';

type EntityResponseType = HttpResponse<IProductCategory>;
type EntityArrayResponseType = HttpResponse<IProductCategory[]>;

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/product-categories';

  constructor(protected http: HttpClient) {}

  create(productCategory: IProductCategory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productCategory);
    return this.http
      .post<IProductCategory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productCategory: IProductCategory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productCategory);
    return this.http
      .put<IProductCategory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProductCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductCategory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(productCategory: IProductCategory): IProductCategory {
    const copy: IProductCategory = Object.assign({}, productCategory, {
      creationDate:
        productCategory.creationDate && productCategory.creationDate.isValid() ? productCategory.creationDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate ? moment(res.body.creationDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((productCategory: IProductCategory) => {
        productCategory.creationDate = productCategory.creationDate ? moment(productCategory.creationDate) : undefined;
      });
    }
    return res;
  }
}
