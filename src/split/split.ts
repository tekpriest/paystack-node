import { Axios } from 'axios';
import {
  BadRequest,
  CreateSplit,
  ListSplitQueryParams,
  ListSplitsResponse,
  Response,
  SplitCreatedResponse,
  SplitSubAccount,
  TransactionSplitResponse,
  UpdateTransactionSplit,
  UpdateTransactionSplitResponse,
} from './interface';

/**
 * The Transaction Splits API enables merchants
 * split the settlement for a transaction across
 * their payout account, and one or more Subaccounts.
 */
export class TransactionSplit {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  /**
   * Create a split payment on your integration
   */
  async create(data: CreateSplit): Promise<SplitCreatedResponse | BadRequest> {
    return await this.http.request({
      url: '/split',
      data: JSON.stringify(data),
      method: 'post',
    });
  }

  /**
   * List/search for the transaction splits available on your integration.
   */
  async list(
    queryParams?: ListSplitQueryParams,
  ): Promise<ListSplitsResponse | BadRequest> {
    return await this.http.request({
      url: '/split',
      params: { ...queryParams },
      method: 'get',
    });
  }

  /**
   * Get details of a split on your integration.
   */
  async fetch(splitId: string): Promise<TransactionSplitResponse | BadRequest> {
    return await this.http.request({
      url: `/split/${splitId}`,
      method: 'get',
    });
  }

  /**
   * Update a transaction split details on your integration
   */
  async update(
    splitId: string,
    data: UpdateTransactionSplit,
  ): Promise<UpdateTransactionSplitResponse | BadRequest> {
    return await this.http.request({
      url: `/split/${splitId}`,
      data: JSON.stringify(data),
      method: 'put',
    });
  }

  /**
   * Add a Subaccount to a Transaction Split,
   * or update the share of an existing Subaccount in a Transaction Split
   */
  async add(
    splitId: string,
    data: SplitSubAccount,
  ): Promise<TransactionSplitResponse | BadRequest> {
    return await this.http.request({
      url: `/split/${splitId}/subaccount/add`,
      data: JSON.stringify(data),
      method: 'post',
    });
  }

  /**
   * Remove a subaccount from a transaction split
   */
  async remove(
    splitId: string,
    subaccount: string,
  ): Promise<Response | BadRequest> {
    return await this.http.request({
      url: `/split/${splitId}/subaccount/remove`,
      data: JSON.stringify({ subaccount }),
      method: 'post',
    });
  }
}
