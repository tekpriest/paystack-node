import { Axios } from 'axios';
import {
  InitializeTransaction,
  ListTransactionQueryParams,
  TransactionResponse,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
  data: null;
}

export interface ITransaction {
  initialize(
    data: InitializeTransaction,
  ): Promise<TransactionResponse | BadRequest>;
  verify(reference: string): Promise<TransactionResponse | BadRequest>;
  list(
    queryParams: ListTransactionQueryParams,
  ): Promise<TransactionResponse | BadRequest>;
}

/**
 * ## Tansactions
 * The transaction API allows you create and manage
 * payments on your integration
 */
export class Transaction implements ITransaction {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }
  /**
   * Initialize a transaction
   * @param {InitializeTransaction} data **Body Param**
   */
  async initialize(
    data: InitializeTransaction,
  ): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.post(
      '/transaction/initialize',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }
  async verify(reference: string): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.get('/transaction/verify', {
      params: { reference },
    });
    return JSON.parse(response.data);
  }
  async list(
    queryParams: ListTransactionQueryParams,
  ): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.get('/transaction', {
      params: { queryParams },
    });
    return JSON.parse(response.data);
  }
}
