import { Meta, Response } from '../interface';
import { ProductCreated } from '../product/interface';

export interface CreatePage {
  /**
   * Name of page
   */
  name: string;
  /**
   * A description for this page
   */
  description?: string;
  /**
   * Amount should be in kobo if currency is `NGN`, pesewas,
   * if currency is `GHS`, and cents, if currency is `ZAR`
   */
  amount?: number;
  /**
   * URL slug you would like to be associated with this page.
   * Page will be accessible at https://paystack.com/pay/[slug]
   */
  slug?: string;
  /**
   * Extra data to configure the payment page including subaccount,
   * logo image, transaction charge
   */
  metadata?: Record<string, unknown>;
  /**
   * If you would like Paystack to redirect someplace upon successful payment,
   * specify the URL here.
   */
  redirect_url?: string;
  /**
   * If you would like to accept custom fields, specify them here.
   */
  custom_fields?: Record<string, unknown>[];
}

export interface UpdatePage {
  /**
   * Name of page
   */
  name: string;
  /**
   * A description for this page
   */
  description: string;
  /**
   * Amount should be in kobo if currency is `NGN`, pesewas,
   * if currency is `GHS`, and cents, if currency is `ZAR`
   */
  amount?: number;
  /**
   * Set to false to deactivate page url
   */
  active?: boolean;
}

export interface PaymentPageProduct {
  product_id: number;
  name: string;
  description: string;
  product_code: string;
  page: number;
  price: number;
  currency: string;
  quantity: number;
  type: string;
  features?: unknown;
  is_shippable: number;
  domain: string;
  integration: number;
  active: number;
  in_stock: number;
}

export interface PaymentPage {
  id: number;
  name: string;
  description?: string;
  integration: number;
  domain: string;
  slug: string;
  currency: string;
  type: string;
  redirect_url?: string;
  success_message?: string;
  collect_phone: boolean;
  active: boolean;
  published: boolean;
  migrate: boolean;
  notification_email?: string;
  metadata?: Record<string, unknown>;
  split_code?: string;
  createdAt: Date;
  updatedAt: Date;
  products?: ProductCreated[];
}

export interface PaymentPageCreatedFetchedUpdatedResponse extends Response {
  data: PaymentPage;
}

export interface ListPaymentPagesResponse extends Response {
  data: PaymentPage[];
  meta?: Meta;
}
