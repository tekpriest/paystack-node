import { Customer } from '../customer/interface';
import { Response } from '../interface';
import { Transaction } from '../transaction/interface';

export interface Charge {
  amount: number;
  currency: string;
  transaction_date: string;
  status: string;
  reference: string;
  domain: string;
  metadata?: Record<string, unknown>;
  gateway_response: string;
  message: string;
  channel: string;
  ip_address: string;
  log?: unknown;
  fees: number;
  authorization: Authorization;
  customer: Customer;
  transaction?: Transaction;
  display_text: string;
  plan: unknown;
  fees_split?: string;
  paid_at: Date;
}

export interface CreateCharge {
  /** Customer's email address */
  email: string;
  /** Amount in subunit of the [supported currency](https://paystack.com/docs/api/#supported-currency) */
  amount: string;
  /** The split code of a previously created split. e.g. `SPL_98WF13Eb3w` */
  split_code?: string;
  /** The code for the subaccount that owns the payment. e.g. `ACCT_8f4s1eq7ml6rlzj` */
  subaccount?: string;
  /**
   * An amount used to override the split configuration for a single split payment.
   * If set, the amount specified goes to the main account regardless of the split configuration. */
  transaction_charge?: number;
  /**
   * Use this param to indicate who bears the transaction charges.
   * Allowed values are: account or subaccount (defaults to account).
   */
  bearer?: 'account' | 'subaccount';
  /** Bank account to charge (don't send if charging an authorization code). */
  bank?: {
    code: string;
    account_number: string;
  };
  /**
   * Takes the settings for the Pay with Transfer (PwT) channel.
   * Pass in the `account_expires_at` param to set the expiry time.
   */
  bank_transfer?: Record<string, unknown>;
  /** USSD type to charge (don't send if charging an authorization code, bank or card). */
  ussd?: Record<string, unknown>;
  /**
   * Mobile money details (don't send if charging an authorization code, bank or card).
   * Currently supported in Ghana and Kenya only.
   */
  mobile_money?: Record<string, unknown>;
  /**
   * Takes a provider parameter with the value set to: `scan-to-pay.`
   * Currently supported in South Africa only.
   */
  qr?: Record<string, unknown>;
  /**
   * An authorization code to charge (don't send if charging a bank account).
   */
  authorization_code?: string;
  /** 4-digit PIN (send with a non-reusable authorization code). */
  pin?: string;
  /** Used for passing additional details for your post-payment processes. */
  metadata?: Record<string, unknown>;
  /**
   * Unique transaction reference. Only `-`, `.`, `=` and alphanumeric characters allowed.
   */
  reference?: string;
  /**
   * This is the unique identifier of the device a user uses in making payment.
   * Only `-`, `.`, `=` and alphanumeric characters allowed.
   */
  device_id?: string;
}
/***/
export interface SubmitPIN {
  /** Reference for transaction that requested pin. */
  reference: string;
  /** PIN submitted by user. */
  pin: string;
}
export interface SubmitOTP {
  /** Reference for ongoing transaction. */
  reference: string;
  /** OTP submitted by user. */
  otp: string;
}

export interface SubmitPhone {
  /** Reference for ongoing transaction. */
  reference: string;
  /** Phone submitted by user. */
  phone: string;
}

export interface SubmitBirthday {
  /** Reference for ongoing transaction. */
  reference: string;
  /** Birthday submitted by user. e.g **1970-01-01** */
  birthday: Date;
}

export interface SubmitAddress {
  /** Reference for ongoing transaction. */
  reference: string;
  /** Address submitted by user. */
  address: string;
  /** City submitted by user. */
  city: string;
  /** State submitted by user. */
  state: string;
  /** Zipcode submitted by user. */
  zip_code: string;
}

export interface ChargeCreatedResponse extends Response {
  data: Charge;
}

export interface ChargeCreatedWithPendingResponse extends Response {
  data: {
    reference: string;
    status: string;
  };
}

export interface ChargeCreatedWithAddressResponse extends Response {
  data: {
    display_text: string;
    reference: string;
    status: string;
    country_code: string;
  };
}

export interface ChargeCreatedWithMobileMoneyResponse extends Response {
  data: Charge;
}

export interface ChargeCreatedWithUSSDResponse extends Response {
  data: {
    reference: string;
    status: string;
    display_text: string;
    ussd_code: string;
  };
}

export interface ChargeCreatedWithBirthdayResponse extends Response {
  data: {
    reference: string;
    status: string;
    display_text: string;
  };
}

export interface ChargeCreatedWithBankAuthResponse extends Response {
  data: {
    refernce: string;
    uri: string;
    status: string;
  };
}

export interface ChargeCreatedWithOTPResponse extends Response {
  data: {
    refernce: string;
    status: string;
    display_text: string;
  };
}

export interface ChargeCreatedWithPinResponse extends Response {
  data: {
    refernce: string;
    status: string;
  };
}

export interface ChargeCreatedWithPhoneResponse extends Response {
  data: {
    refernce: string;
    status: string;
    display_text: string;
  };
}
export interface ChargeFailedResponse extends Response {
  data: {
    refernce: string;
    message: string;
    status: string;
  };
}

export interface Authorization {
  authorization_code: string;
  card_type: string;
  bank: string;
  bin: string;
  brand: string;
  channel: string;
  country_code: string;
  exp_month: string;
  exp_year: string;
  last4: string;
  reusable: boolean;
  signature: string;
  account_name: string;
}
