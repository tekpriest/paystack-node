import { Axios } from 'axios';
import {
  CheckAuthorizationResponse,
  ExportTransaction,
  ListTransactions,
  PartialDebitResponse,
  Timeline,
  GetTransactionResponse,
} from './interface';
import {
  ChargeAuthorization,
  CheckAuthorization,
  InitializeTransaction,
  ListTransactionQueryParams,
  PartialDebit,
  TransactionInitialized,
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
  ): Promise<TransactionInitialized | BadRequest> {
    return await this.http.post(
      '/transaction/initialize',
      JSON.stringify(data),
    );
  }
  async verify(
    reference: number,
  ): Promise<GetTransactionResponse | BadRequest> {
    return await this.http.get(`/transaction/verify/${reference}`);
  }
  async list(
    queryParams?: ListTransactionQueryParams,
  ): Promise<ListTransactions | BadRequest> {
    return await this.http.get('/transaction', {
      params: { ...queryParams },
    });
  }

  async fetch(id: string): Promise<GetTransactionResponse | BadRequest> {
    return await this.http.get(`/transaction/:${id}`);
  }

  async chargeAuthorization(
    data: ChargeAuthorization,
  ): Promise<GetTransactionResponse | BadRequest> {
    return await this.http.post(
      '/transaction/charge_authorization',
      JSON.stringify(data),
    );
  }

  async checkAuthorization(
    data: CheckAuthorization,
  ): Promise<CheckAuthorizationResponse | BadRequest> {
    return await this.http.post(
      '/transaction/check_authorization',
      JSON.stringify(data),
    );
  }

  async viewTimeline(id: string): Promise<Timeline | BadRequest> {
    return await this.http.get(`/transaction/timeline/${id}`);
  }

  async total(
    queryParams: ListTransactionQueryParams,
  ): Promise<ListTransactions | BadRequest> {
    return await this.http.get('/transaction/totals', {
      params: { ...queryParams },
    });
  }

  async export(
    queryParams: ListTransactionQueryParams,
  ): Promise<ExportTransaction | BadRequest> {
    return await this.http.get('/transaction/export', {
      params: { ...queryParams },
    });
  }

  async partialDebit(
    data: PartialDebit,
  ): Promise<PartialDebitResponse | BadRequest> {
    return await this.http.post(
      '/transaction/partial_debit',
      JSON.stringify(data),
    );
  }
}
