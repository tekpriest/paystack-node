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
    const response = await this.http.post<
      TransactionInitialized | BadRequest,
      any
    >('/transaction/initialize', JSON.stringify(data));
    return response;
  }
  async verify(reference: string): Promise<GetTransactionResponse | BadRequest> {
    const response = await this.http.get<GetTransactionResponse | BadRequest, any>(
      '/transaction/verify',
      {
        params: { reference },
      },
    );
    return response;
  }
  async list(
    queryParams?: ListTransactionQueryParams,
  ): Promise<ListTransactions | BadRequest> {
    const response = await this.http.get<ListTransactions | BadRequest, any>(
      '/transaction',
      {
        params: { ...queryParams },
      },
    );
    return response;
  }

  async fetch(id: string): Promise<GetTransactionResponse | BadRequest> {
    const response = await this.http.get<GetTransactionResponse | BadRequest, any>(
      `/transaction/:${id}`,
    );
    return response;
  }

  async chargeAuthorization(
    data: ChargeAuthorization,
  ): Promise<GetTransactionResponse | BadRequest> {
    const response = await this.http.post<GetTransactionResponse | BadRequest, any>(
      '/transaction/charge_authorization',
      JSON.stringify(data),
    );
    return response;
  }

  async checkAuthorization(
    data: CheckAuthorization,
  ): Promise<CheckAuthorizationResponse | BadRequest> {
    const response = await this.http.post<
      CheckAuthorizationResponse | BadRequest,
      any
    >('/transaction/check_authorization', JSON.stringify(data));
    return response;
  }

  async viewTimeline(id: string): Promise<Timeline | BadRequest> {
    return await this.http.get<Timeline | BadRequest, any>(
      `/transaction/timeline/${id}`,
    );
  }

  async total(
    queryParams: ListTransactionQueryParams,
  ): Promise<ListTransactions | BadRequest> {
    return await this.http.get<ListTransactions | BadRequest, any>(
      '/transaction/totals',
      {
        params: { ...queryParams },
      },
    );
  }

  async export(
    queryParams: ListTransactionQueryParams,
  ): Promise<ExportTransaction | BadRequest> {
    return await this.http.get<ExportTransaction | BadRequest, any>(
      '/transaction/export',
      {
        params: { ...queryParams },
      },
    );
  }

  async partialDebit(
    data: PartialDebit,
  ): Promise<PartialDebitResponse | BadRequest> {
    const response = await this.http.post(
      '/transaction/partial_debit',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }
}
