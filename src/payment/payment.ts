import { Axios } from 'axios';
import { BadRequest, QueryParams } from '../interface';
import {
  CreatePage,
  ListPaymentPagesResponse,
  PaymentPageCreatedFetchedUpdatedResponse,
  UpdatePage,
} from './interface';

export class PaymentPage {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async create(
    data: CreatePage,
  ): Promise<PaymentPageCreatedFetchedUpdatedResponse | BadRequest> {
    return await this.http.post('/page', JSON.stringify(data));
  }

  async list(
    queryParams?: QueryParams,
  ): Promise<ListPaymentPagesResponse | BadRequest> {
    return await this.http.get('/page', { params: { ...queryParams } });
  }

  async fetch(
    id: string,
  ): Promise<PaymentPageCreatedFetchedUpdatedResponse | BadRequest> {
    return await this.http.get(`/page/${id}`);
  }

  async update(
    id: string,
    data: UpdatePage,
  ): Promise<PaymentPageCreatedFetchedUpdatedResponse | BadRequest> {
    return await this.http.put(`/page/${id}`, JSON.stringify(data));
  }

  async slugAvailable(
    slug: string,
  ): Promise<PaymentPageCreatedFetchedUpdatedResponse | BadRequest> {
    return await this.http.get(`/page/check_slug_availability/${slug}`);
  }

  async addProduct(
    id: number,
    products: number[],
  ): Promise<PaymentPageCreatedFetchedUpdatedResponse | BadRequest> {
    return await this.http.post(
      `/page/${id}/product`,
      JSON.stringify({ products }),
    );
  }
}
