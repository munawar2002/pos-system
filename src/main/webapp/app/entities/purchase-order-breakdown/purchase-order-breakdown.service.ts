import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPurchaseOrderBreakdown } from 'app/shared/model/purchase-order-breakdown.model';

type EntityResponseType = HttpResponse<IPurchaseOrderBreakdown>;
type EntityArrayResponseType = HttpResponse<IPurchaseOrderBreakdown[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrderBreakdownService {
  public resourceUrl = SERVER_API_URL + 'api/purchase-order-breakdowns';

  constructor(protected http: HttpClient) {}

  create(purchaseOrderBreakdown: IPurchaseOrderBreakdown): Observable<EntityResponseType> {
    return this.http.post<IPurchaseOrderBreakdown>(this.resourceUrl, purchaseOrderBreakdown, { observe: 'response' });
  }

  update(purchaseOrderBreakdown: IPurchaseOrderBreakdown): Observable<EntityResponseType> {
    return this.http.put<IPurchaseOrderBreakdown>(this.resourceUrl, purchaseOrderBreakdown, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPurchaseOrderBreakdown>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPurchaseOrderBreakdown[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
