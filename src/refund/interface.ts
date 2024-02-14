import { QueryParams, Response } from '../interface';
import { Transaction } from '../transaction/interface';

export interface CreateRefund {
  /**
   * Transaction reference or id
   */
  transaction: string;

  /**
   * Amount to be refunded to the customer.
   * Amount is optional(defaults to original transaction amount)
   * and cannot be more than the original transaction amount.
   */
  amount?: number;

  /**
   * Any of the supported currency
   */
  currency?: string;

  /**
   * Customer reason
   */
  customer_note?: string;

  /**
   * Merchant reason
   */
  merchant_note?: string;
}

export interface ListRefundQueryParams extends QueryParams {
  /**
   * Identifier for transaction to be refunded
   */
  reference: string;

  /**
   * Any of the supported currency
   */
  currency: string;
}

export interface ListRefundsResponse extends Response {
  data: Refund[];
}

export interface RefundCreatedResponse extends Response {
  data: Refund;
}

export interface FetchRefundResponse extends Response {
  data: Refund;
}

export interface Refund {
  id: number;
  integration: number;
  domain: string;
  transaction: number | Transaction;
  dispute: number;
  amount: number;
  deducted_amount: number;
  currency: string;
  channel: string;
  fully_deducted: boolean;
  refunded_by: string;
  refunded_at?: string;
  expected_at: string;
  settlement: number;
  customer_note: string;
  merchant_note: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}
