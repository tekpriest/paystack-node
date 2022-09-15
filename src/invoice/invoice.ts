import { Axios } from 'axios';
import { BadRequest, Response } from '../interface';
import {
  CreateInvoice,
  InvoiceCreatedResponse,
  InvoiceQueryParams,
  InvoiceTotalResponse,
  ListInvoicesResponse,
  UpdateInvoice,
  ViewInvoiceResponse,
} from './interface';

export class Invoice {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async create(
    data: CreateInvoice,
  ): Promise<InvoiceCreatedResponse | BadRequest> {
    return await this.http.post('/paymentrequest', JSON.stringify(data));
  }

  async list(
    queryParams?: InvoiceQueryParams,
  ): Promise<ListInvoicesResponse | BadRequest> {
    return await this.http.get('/paymentrequest', {
      params: { ...queryParams },
    });
  }

  async view(id: string): Promise<ViewInvoiceResponse | BadRequest> {
    return await this.http.get(`'/paymentrequest/${id}`);
  }

  async verify(code: string): Promise<ViewInvoiceResponse | BadRequest> {
    return await this.http.get(`/paymentrequest/verify/${code}`);
  }

  async sendNotification(code: string): Promise<Response | BadRequest> {
    return await this.http.post(`/paymentrequest/notify/${code}`);
  }

  async total(): Promise<InvoiceTotalResponse | BadRequest> {
    return await this.http.get('/paymentrequest/totals');
  }

  async finalize(code: string): Promise<ViewInvoiceResponse | BadRequest> {
    return await this.http.post(`/paymentrequest/finalize/${code}`);
  }

  async update(
    id: string,
    data: UpdateInvoice,
  ): Promise<ViewInvoiceResponse | BadRequest> {
    return await this.http.put(`/paymentrequest/${id}`, JSON.stringify(data));
  }

  async archive(code: string): Promise<Response | BadRequest> {
    return await this.http.post(`/paymentrequest/archive/${code}`);
  }
}
