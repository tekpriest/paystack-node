import { Customer } from '../customer/interface';
import { Currency, QueryParams, Response } from '../interface';
import { Transaction } from '../transaction/interface';

export type CreateRefund = {
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
  currency?: Currency;

  /**
   * Customer reason
   */
  customer_note?: string;

  /**
   * Merchant reason
   */
  merchant_note?: string;
};

export type ListRefundQueryParams = QueryParams & {
  /**
   * Any of the [supported currency](https://paystack.com/docs/api/#supported-currency)
   */
  currency: Currency;

  /**
   * The transaction ID of the refunded transaction
   */
  transaction: string;
};

export type RetryAccountDetails = {
  /**
   * The currency of the customer's bank account. It should be the same as the currency the payment was made
   */
  currency: string;

  /**
   * The customer's account number
   */
  account_number: string;

  /**
   * The ID representing the customer's bank. You can get the list of bank IDs by calling the List Banks endpoint.
   */
  bank_id: string;
};

export type ListRefundsResponse = Response & { data: Refund[] };
export type RefundCreatedResponse = Response & { data: Refund };
export type FetchRefundResponse = Response & { data: Refund };
export type RetryRefundResponse = Response & { data: Refund };

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
  refunded_at?: Date;
  expected_at: Date;
  settlement: number;
  customer_note: string;
  merchant_note: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'processing' | 'needs-attention';
  bank_reference?: string;
  reason: string;
  customer?: Customer;
  initiated_at: string;
  reversed_at?: Date;
  session_id?: string;
}
