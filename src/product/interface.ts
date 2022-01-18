import { Meta } from '../interface';

export interface CreateProduct {
  /** Name of product */
  name: string;
  /** A description for this product */
  description: string;
  /**
   * Price should be in *kobo* if currency is `NGN`,
   * *pesewas*, if currency is `GHS`, and *cents*, if currency is `ZAR`
   */
  price: number;
  /** Currency in which price is set. Allowed values are: NGN, GHS, ZAR or USD */
  currency: string;
  /**
   * Set to `true` if the product has unlimited stock. Leave as `false` if the product has limited stock
   */
  unlimited?: boolean;
  /** Number of products in stock. Use if `unlimited` is `false` */
  quantity?: number;
}

export interface Response {
  status: boolean;
  message: string;
}

export interface ProductCreated extends Response {
  data: Product;
}

export interface ListProducts extends Response {
  data: Product[];
  meta: Meta;
}

export interface FetchProduct extends Response {
  data: Product;
}

export interface UpdateProduct extends Response {
  data: Product;
}

export interface ListProductQueryParams {
  /**
   * Specify how many records you want to retrieve per page.
   * If not specify we use a default value of 50.
   */
  perPage?: number;
  /**
   * Specify exactly what page you want to retrieve.
   * If not specify we use a default value of 1.
   */
  page?: number;
  /**
   * A timestamp from which to start listing transaction
   * e.g `2021-10-25T00.00.05.000z`, `2021-12-25`
   */
  from?: Date;
  /**
   * A timestamp from which to stop listing transaction
   * e.g `2021-10-25T00.00.05.000z`, `2021-12-25`
   */
  to?: Date;
}

interface Product {
  id: number;
  name: string;
  description: string;
  currency: string;
  price: number;
  quantity: number;
  image_path: string;
  file_path: string;
  is_shippable: boolean;
  unlimited: boolean;
  integration: number;
  domain: string;
  metadata: Record<string, unknown>;
  slug: string;
  product_code: string;
  quantity_sold: number;
  type: string;
  shipping_fields: Record<string, unknown>;
  active: boolean;
  in_stock: boolean;
  minimum_orderable: number;
  maximum_orderable: number;
  low_stock_alert: boolean;
  createdAt: Date;
  updatedAt: Date;
}
