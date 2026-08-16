import { HttpClient } from '../http';
import { BadRequest } from '../interface';
import {
  CreatePaymentRequest,
  CreatePaymentRequestResponse,
  FetchPaymentRequestResponse,
  FinalizePaymentRequest,
  ListPaymentRequestsQueryParams,
  ListPaymentRequestsResponse,
  PaymentRequestTotalsResponse,
  UpdatePaymentRequest,
} from './interface';

export class PaymentRequest {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async create(
    data: CreatePaymentRequest,
  ): Promise<CreatePaymentRequestResponse | BadRequest> {
    return await this.http.post('/paymentrequest', JSON.stringify(data));
  }

  async list(
    queryParams?: ListPaymentRequestsQueryParams,
  ): Promise<ListPaymentRequestsResponse | BadRequest> {
    return await this.http.get('/paymentrequest', {
      params: { ...queryParams },
    });
  }

  async fetch(
    idOrCode: string,
  ): Promise<FetchPaymentRequestResponse | BadRequest> {
    return await this.http.get(`/paymentrequest/${idOrCode}`);
  }

  async verify(
    code: string,
  ): Promise<FetchPaymentRequestResponse | BadRequest> {
    return await this.http.get(`/paymentrequest/verify/${code}`);
  }

  async sendNotification(
    code: string,
  ): Promise<CreatePaymentRequestResponse | BadRequest> {
    return await this.http.post(`/paymentrequest/notify/${code}`);
  }

  async total(): Promise<PaymentRequestTotalsResponse | BadRequest> {
    return await this.http.get('/paymentrequest/totals');
  }

  async finalize(
    code: string,
    data?: FinalizePaymentRequest,
  ): Promise<CreatePaymentRequestResponse | BadRequest> {
    return await this.http.post(
      `/paymentrequest/finalize/${code}`,
      JSON.stringify(data || {}),
    );
  }

  async update(
    idOrCode: string,
    data: UpdatePaymentRequest,
  ): Promise<CreatePaymentRequestResponse | BadRequest> {
    return await this.http.put(
      `/paymentrequest/${idOrCode}`,
      JSON.stringify(data),
    );
  }

  async archive(
    code: string,
  ): Promise<CreatePaymentRequestResponse | BadRequest> {
    return await this.http.post(`/paymentrequest/archive/${code}`);
  }
}
