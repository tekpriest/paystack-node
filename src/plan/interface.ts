import { Meta } from '../interface';
import { Subscription } from '../subscription/interface';

export interface CreatePlan {
  /**
   * Name of plan
   */
  name: string;
  /**
   * Amount should be in **kobo** if currency is
   * `NGN`, **pesewas**, if currency is `GHS`, and
   * **cents** if currency is `ZAR`
   */
  amount: number;
  /**
   * Interval in words,
   * Valid intervals are `daily`,`weekly`,`monthly`,`biannually`,`annually`
   */
  interval?: string;
  /**
   * A description for this plan
   */
  description?: string;
  /**
   * Set to false if you don't want invoices to be sent
   * to your custmers
   */
  send_invoices?: boolean;
  /**
   * Set to false if you don't want text messages to be sent
   * to your customers
   */
  send_sms?: string;
  /**
   * Currency in which amount is set. Allowed values are
   * NGN, GHS, ZAR or USD
   */
  currency?: string;
  /**
   * Number of invoices to raise during subscription to this plan.
   * Can be overridden by specifying an `invoice_limit` while subscribing
   */
  invoice_limit?: number;
}

export interface PlanResponse {
  status: boolean;
  message: string;
  data: PlanCreated | Plan | Plans;
  meta?: Meta;
}

interface PlanCreated {
  name: string;
  amount: number;
  interval: string;
  integration: number;
  domain: string;
  plan_code: string;
  description: unknown;
  send_invoices: boolean;
  send_sms: boolean;
  hosted_page: boolean;
  hosted_page_url: unknown;
  hosted_page_summary: unknown;
  currency: string;
  migrate: boolean;
  is_archived: boolean;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
interface Plan extends PlanCreated {
  subscriptions: Subscription[];
  is_deleted: boolean;
  pages_count: number;
  subscribers_count: number;
  subscriptions_count: number;
  active_subscriptions_count: number;
  total_revenue: number;
  subscribers: unknown[];
}
interface Plans extends PlanCreated {
  subscriptions: Subscription[];
}
[];

export interface ListPlanQueryParams {
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
   * Filter transactions by status ('failed', 'success', 'abandoned')
   */
  status?: string;
  /**
   * Filter transactions by amount.
   * Specify the amount (in **kobo** if currency is `NGN`,
   * **pesewas**, if currency is `GHS`,
   * and **cents**, if currency is `ZAR`)
   */
  amount: number;
  /**
   * Filter list by plans with specified interval
   */
  interval?: number;
}
export interface UpdatePlan {
  /**
   * Name of plan
   */
  name: string;
  /**
   * Amount should be in `kobo` if currency is
   * NGN and `pesewas` for GHS
   */
  amount: number;
  /**
   * Interval in words. Valid intervals are
   * `hourly`,`daily`,weekly`,`monthly`,`biannually`,`annually`.
   */
  interval: string;
  /**
   * A description for this plan
   */
  description?: string;
  /**
   * Set to false if you don't want invoices to be sent
   * to your custmers
   */
  send_invoices?: boolean;
  /**
   * Set to false if you don't want text messages to be sent
   * to your customers
   */
  send_sms?: string;
  /**
   * Currency in which amount is set. Allowed values are
   * NGN, GHS, ZAR or USD
   */
  currency?: string;
  /**
   * Number of invoices to raise during subscription to this plan.
   * Can be overriden by specifying an `invoice_limit` while subscribing
   */
  invoice_limit?: number;
}

export interface IPlan {
  domain: string;
  name: string;
  plan_code: string;
  description: string;
  amount: number;
  interval: string;
  send_invoices: boolean;
  send_sms: boolean;
  hosted_page: boolean;
  hosted_page_url: string;
  hosted_page_summary: string;
  currency: string;
  migrate: boolean;
  id: number;
  integration: number;
  is_archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
