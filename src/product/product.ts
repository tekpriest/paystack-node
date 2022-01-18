import { Axios } from 'axios';
import {
  CreateProduct,
  FetchProduct,
  ListProductQueryParams,
  ListProducts,
  ProductCreated,
  UpdateProduct,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
}

/**
 * @class Product
 * # Producs
 * The products API allows you create and manage inventories
 * on your integration
 */
export class Product {
  http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async create(data: CreateProduct): Promise<ProductCreated | BadRequest> {
    return await this.http.post<ProductCreated | BadRequest, any>(
      '/product',
      JSON.stringify(data),
    );
  }
  async list(
    queryParams?: ListProductQueryParams,
  ): Promise<ListProducts | BadRequest> {
    return await this.http.get<ListProducts | BadRequest, any>('/product', {
      params: { ...queryParams },
    });
  }
  async fetch(id: string): Promise<FetchProduct | BadRequest> {
    return await this.http.get<FetchProduct | BadRequest, any>(
      `/product/${id}`,
    );
  }
  async update(
    id: string,
    data: CreateProduct,
  ): Promise<UpdateProduct | BadRequest> {
    return await this.http.put<UpdateProduct | BadRequest, any>(
      `/product/${id}`,
      JSON.stringify(data),
    );
  }
}
