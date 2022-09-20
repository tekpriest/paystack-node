import { Authorization } from '../charge/interface';
import { Customer } from '../customer/interface';
import { Meta } from '../interface';
import { IPlan } from '../plan';

export interface CreateSubscription {
  /**
   * Customer's email address or customer code
   */
  customer: string;
  /**
   * Plan code
   */
  plan: string;
  /**
   * If customer has multiple authorizations, you can set the desired
   * authorization you wish to use for this subscription here.
   * If this is not supplied, the customer's most recent authorization would be used
   */
  authorization?: string;
  /**
   * Set the date for the first debit. (ISO 8601 format)
   * e.g `2022-01-01T00:00:00+01:00`
   */
  start_date?: Date;
}

export interface Response {
  status: boolean;
  message: string;
}

export interface SubscriptionCreated extends Response {
  data: {
    customer: number;
    plan: number;
    integration: number;
    domain: string;
    start: number;
    status: string;
    quantity: number;
    amount: number;
    authorization: Authorization;
  };
}

export interface ListSubscriptions extends Response {
  data: Subscription[];
  meta: Meta;
}

export interface FetchSubscription extends Response {
  data: {
    invoices: unknown[];
    customer: Customer;
    plan: IPlan;
    integration: number;
    authorization: Authorization;
    domain: string;
    start: number;
    status: string;
    quantity: number;
    amount: number;
    subscription_code: string;
    email_token: string;
    easy_cron_id: string;
    cron_expression: string;
    next_payment_date: Date;
    open_invoice: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface GenerateSubscriptionLink extends Response {
  data: {
    link: string;
  };
}

export interface EnableOrDisableSubscription {
  code: string;
  token: string;
}

export interface Subscription {
  customer: Customer;
  plan: IPlan;
  integration: number;
  authorization: Authorization;
  domain: string;
  start: number;
  status: string;
  quantity: number;
  amount: number;
  subscription_code: string;
  email_token: string;
  easy_cron_id: string;
  cron_expression: string;
  next_payment_date: Date;
  open_invoice: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListSubscriptionQueryParams {
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
   * Filter by Customer ID
   */
  customer?: number;
  /**
   * Filter by Plan ID
   */
  plan?: number;
}
