import { Meta, Response } from '../interface';

export interface LineItem {
  name: string;
  amount: number;
  quantity?: number;
}

export interface Tax {
  name: string;
  amount: number;
}

export interface CreatePaymentRequest {
  customer: string;
  amount?: number;
  due_date?: Date | string;
  description?: string;
  line_items?: LineItem[];
  tax?: Tax[];
  currency?: string;
  send_notification?: boolean;
  draft?: boolean;
  has_invoice?: boolean;
  invoice_number?: number;
  split_code?: string;
}

export interface UpdatePaymentRequest {
  customer?: string;
  amount?: number;
  due_date?: Date | string;
  description?: string;
  line_items?: LineItem[];
  tax?: Tax[];
  currency?: string;
  send_notification?: boolean;
  draft?: boolean;
  invoice_number?: number;
  split_code?: string;
}

export interface FinalizePaymentRequest {
  send_notification?: boolean;
}

export interface PaymentRequest {
  id: number;
  domain: string;
  amount: number;
  currency: string;
  due_date: string;
  has_invoice: boolean;
  invoice_number: number;
  description: string;
  pdf_url: string | null;
  line_items: LineItem[];
  tax: Tax[];
  request_code: string;
  status: string;
  paid: boolean;
  paid_at: string | null;
  metadata: Record<string, unknown> | null;
  notifications: unknown[];
  offline_reference: string;
  customer: number | Record<string, unknown>;
  created_at: string;
  pending_amount?: number;
}

export interface ListPaymentRequestsQueryParams {
  perPage?: number;
  page?: number;
  customer?: string;
  status?: string;
  currency?: string;
  include_archive?: string;
  from?: Date;
  to?: Date;
}

export interface CreatePaymentRequestResponse extends Response {
  data: PaymentRequest;
}

export interface ListPaymentRequestsResponse extends Response {
  data: PaymentRequest[];
  meta: Meta;
}

export interface FetchPaymentRequestResponse extends Response {
  data: PaymentRequest;
}

export interface PaymentRequestTotalsData {
  pending: { currency: string; amount: number }[];
  successful: { currency: string; amount: number }[];
  total: { currency: string; amount: number }[];
}

export interface PaymentRequestTotalsResponse extends Response {
  data: PaymentRequestTotalsData;
}
