import { Axios } from 'axios';
import {
  ChargeAuthorization,
  CheckAuthorization,
  InitializeTransaction,
  ListTransactionQueryParams,
  PartialDebit,
  TransactionResponse,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
  data: null;
}

/**
 * # Tansactions
 * The transaction API allows you create and manage
 * payments on your integration
 */
export class Transaction {
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
      params: { ...queryParams },
    });
    return JSON.parse(response.data);
  }

  async fetch(id: string): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.get(`/transaction/:${id}`);
    return JSON.parse(response.data);
  }

  async chargeAuthorization(
    data: ChargeAuthorization,
  ): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.post(
      '/transaction/charge_authorization',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }

  async checkAuthorization(
    data: CheckAuthorization,
  ): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.post(
      '/transaction/check_authorization',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }

  async viewTimeline(id: string): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.get(`/transaction/timeline/${id}`);
    return JSON.parse(response.data);
  }

  async totals(
    queryParams: ListTransactionQueryParams,
  ): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.get('/transaction/totals', {
      params: { ...queryParams },
    });
    return JSON.parse(response.data);
  }

  async export(
    queryParams: ListTransactionQueryParams,
  ): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.get('/transaction/export', {
      params: { ...queryParams },
    });
    return JSON.parse(response.data);
  }

  async partialDebit(
    data: PartialDebit,
  ): Promise<TransactionResponse | BadRequest> {
    const response = await this.http.post(
      '/transaction/partial_debit',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }
}
