import { Response } from "../interface";

export interface InitiateTransfer {
  /**
   * Where should we transfer from? Only `balance` for now
   */
  source: string;
  /** Amount to transfer in *kobo* if currency is `NGN`
   * and *pesewas* if currency is `GHS`.
   */
  amount: number;
  /**
   * Code for transfer recipient
   */
  recipient: string;
  /**
   * The reason for the transfer
   */
  reason?: string;
  /**
   * Specify the currency of the transfer. Defaults to NGN
   */
  currency?: string;
  /** If specified, the field should be a unique identifier (in lowercase)
   * for the object. Only `-`,`_` and alphanumeric characters allowed.
   */
  reference?: string;
}

export interface InitiateBulkTransfer {
  /**
   * Where should we transfer from? Only `balance` for now
   */
  source: string;
  /**
   * A list of transfer object. Each object should contain `amount`, `recipient`, and `reference`
   */
  transfers: { amount: number; recipient: string; reference: string }[];
}

export interface ResendTransferOTP {
  transfer_code: string;
  reason: 'resend_otp' | 'transfer';
}

export interface FinalizeTransfer extends Response {
  data: Transfer;
}

export interface TransferInitiated extends Response {
  data: Transfer;
}

export interface BulkTransferInitiated extends Response {
  data: Transfer[];
}

export interface ListTransfers extends Response {
  data: Transfer[];
}

export interface FetchTransfer extends Response {
  data: Transfer;
}

export interface VerifyTransfer extends Response {
  data: Transfer;
}

export interface ListTransferQueryParams {
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
   * Specify an ID for the customer whose transactions
   * you want to retrieve
   */
  customer?: number;
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

interface Transfer {
  integration: number;
  domain: string;
  amount: number;
  source: string;
  source_details: string;
  reason: string;
  recipient: number | string | Record<string, unknown>;
  status: string;
  failures: unknown;
  transfer_code: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LedgerBalance {
  id: number;
  integration: number;
  domain: string;
  balance: number;
  currency: string;
  difference: number;
  reason: string;
  model_responsible: string;
  model_row: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Balance {
  currency: string;
  balance: number;
}

export interface CheckBalanceResponse extends Response {
  data: Balance[];
}

export interface LedgerBalanceResponse extends Response {
  data: LedgerBalance[];
}
