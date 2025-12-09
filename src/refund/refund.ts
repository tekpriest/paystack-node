import { Axios } from 'axios';
import {
  FetchRefundResponse,
  CreateRefund,
  ListRefundQueryParams,
  ListRefundsResponse,
  RefundCreatedResponse,
  RetryRefundResponse,
  RetryAccountDetails,
} from './interface';
import { BadRequest } from '../interface';

export class Refund {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  /**
   * Initiate a refund on your integration
   */
  async create(
    data: CreateRefund,
  ): Promise<RefundCreatedResponse | BadRequest> {
    return await this.http.post('/refund', JSON.stringify(data));
  }

  /**
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
   * Get details of a refund on your integration
   */
  async fetch(id: number): Promise<FetchRefundResponse | BadRequest> {
    return await this.http.get(`/refund/${id}`);
  }

  async retry(
    id: number,
    data: RetryAccountDetails,
  ): Promise<RetryRefundResponse | BadRequest> {
    return await this.http.post(`/refund/retry_with_customer_details/${id}`, {
      refund_account_details: data,
    });
  }
}
