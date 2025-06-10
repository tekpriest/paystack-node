import { Axios } from 'axios';
import { BadRequest, QueryParams } from '../interface';
import {
  ListSettlementsResponse,
  ListSettlementTransactionsResponse,
  SettlementQueryParams,
} from './interface';

export class Settlement {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async list(
    queryParams?: SettlementQueryParams,
  ): Promise<ListSettlementsResponse | BadRequest> {
    return await this.http.get('/settlement', { params: { ...queryParams } });
  }

  async transactions(
    id: string,
    queryParams: QueryParams,
  ): Promise<ListSettlementTransactionsResponse | BadRequest> {
    return await this.http.get(`/settlement/${id}/transactions`, {
      params: { ...queryParams },
    });
  }
}
