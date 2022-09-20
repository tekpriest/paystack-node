import { Customer } from '../customer/interface';
import { Meta, QueryParams, Response } from '../interface';
import { Transaction } from '../transaction/interface';

export interface CreateInvoice {
  /** Customer id or code */
  customer: string;
  /**
   * Payment request amount.
   * It should be used when line items and tax values aren't specified.
   */
  amount: number;
  /** ISO 8601 representation of request due date */
  date_time?: Date;
  /** A short description of the payment request */
  description?: string;
  /**
   * Array of line items int the format
   * [{"name":"item 1", "amount":2000, "quantity": 1}]
   */
  line_items?: Record<string, unknown>[];
  /**
   * Array of taxes to be charged in the format
   * [{"name":"VAT", "amount":2000}]
   */
  tax?: Record<string, unknown>[];
  /**
   * Specify the currency of the invoice.
   * Allowed values are `NGN`, `GHS`, `ZAR` and `USD`. Defaults to NGN
   */
  currency?: string;
  /**
   * Indicates whether Paystack sends an email notification to customer.
   * Defaults to true
   */
  send_notification?: boolean;
  /**
   * Indicate if request should be saved as draft.
   * Defaults to false and overrides send_notification
   */
  draft?: boolean;
  /**
   * Set to true to create a draft invoice
   * (adds an auto incrementing invoice number if none is provided)
   * even if there are no line_items or tax passed
   */
  has_invoice?: boolean;
  /**
   * Numeric value of invoice.
   * Invoice will start from 1 and auto increment from there.
   * This field is to help override whatever value Paystack decides.
   * Auto increment for subsequent invoices continue from this point.
   */
  invoice_number?: number;
  /** The split code of the transaction split. e.g. SPL_98WF13Eb3w */
  split_code?: string;
}

export interface InvoiceQueryParams extends QueryParams {
  /** Filter by customer ID */
  customer?: string;
  /** Filter by invoice status */
  status?: string;
  /**
   * Filter by currency.
   * Allowed values are NGN, GHS, ZAR and USD.
   */
  currency?: string;
  /** Show archived invoices */
  include_archive?: string;
}

export type UpdateInvoice = CreateInvoice;

interface InvoiceLineItem {
  name: string;
  amount: number;
  quantity: number;
}

interface InvoiceTax {
  name: string;
  amount: number;
}

interface IInvoiceTotal {
  currency: string;
  amount: number;
}

export interface Invoice {
  id: number;
  domain: string;
  amount: number;
  discount?: unknown;
  currency: string;
  due_date: Date;
  has_invoice: boolean;
  invoice_number: number;
  description: string;
  line_items: InvoiceLineItem[];
  tax: InvoiceTax[];
  request_code: string;
  status: string;
  paid: boolean;
  paid_at?: Date;
  metadata?: Record<string, unknown>;
  notifications: unknown[];
  offline_reference: string;
  pdf_url?: string;
  transactions: Transaction[];
  archived?: boolean;
  source?: string;
  payment_method?: unknown;
  note?: string;
  amount_paid?: unknown;
  integration: number;
  customer?: number | Customer;
  createdAt: Date;
  updatedAt: Date;
  pending_amount?: number;
}

export interface InvoiceTotal {
  pending: IInvoiceTotal[];
  successful: IInvoiceTotal[];
  total: IInvoiceTotal[];
}

export interface InvoiceCreatedResponse extends Response {
  data: Invoice;
}

export interface ListInvoicesResponse extends Response {
  data: Invoice[];
  meta: Meta;
}

export interface ViewInvoiceResponse extends Response {
  data: Invoice;
}

export interface VerifyInvoiceResponse extends Response {
  data: Invoice;
}

export interface InvoiceTotalResponse extends Response {
  data: InvoiceTotal;
}
