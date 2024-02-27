import { Axios } from 'axios';
import {
  FetchRefundResponse,
  CreateRefund,
  ListRefundQueryParams,
  ListRefundsResponse,
  RefundCreatedResponse,
} from './interface';
import { BadRequest } from '../interface';

export class Refund {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  /**
   * #### Create Refund
   * Initiate a refund on your integration
   */
  async create(
    data: CreateRefund,
  ): Promise<RefundCreatedResponse | BadRequest> {
    return await this.http.post('/refund', JSON.stringify(data));
  }

  /**
   * #### List Refunds
   * List refunds available on your integration
   */
  async list(
    queryParams?: ListRefundQueryParams,
  ): Promise<ListRefundsResponse | BadRequest> {
    return await this.http.get('/refund', {
      params: { ...queryParams },
    });
  }

  /**
   * #### Fetch Refund
   * Get details of a refund on your integration
   */
  async fetch(reference: string): Promise<FetchRefundResponse | BadRequest> {
    return await this.http.get(`/refund/${reference}`);
  }
}
