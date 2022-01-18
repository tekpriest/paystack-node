import { Authorization, Customer } from '../charge';
import { Meta } from '../interface';

export interface InitializeTransaction {
  /**
   * Amount should be in **kobo** if currency
   * is `NGN`, **pesewas**, if the currency is `GHS` and
   * **cents**, if currency is `ZAR`
   */
  amount: string;
  /**
   * Customer's email address
   */
  email: string;
  /**
   * The transaction currency (NGN, GHS, ZAR or USD).
   * Defaults to your integration currency.
   */
  currency?: string;
  /**
   * Unique transaction reference. Only `-`,`.`,`=`
   * and alphanumeric characters allowed
   */
  reference?: string;
  /**
   * Fully qualified url, e.g. https://example.com/.
   * Use this to override the callback url provided on
   * the dashboard for this transaction
   */
  callback_url?: string;
  /**
   * If transaction is to create a subscription to a predefined plan,
   * provide plan code here. This would invalidate the value provided
   * in `amount`
   */
  plan?: string;
  /**
   * Number of times to charge customer during subscription to plan
   */
  invoice_limit?: string;
  /**
   * Stringified JSON object of custom data.
   * Kindly check the [Metadata](https://paystack.com/docs/payments/metadata)
   * page for more information.
   */
  metadata?: Record<string, unknown>;
  /**
   * An array of payment channels to control what channels
   * you want to make available to the user to make a payment
   * with.
   * @example ['card','bank','ussd','qr','mobile_money','bank_transfer']
   */
  channels?: string[];
  /**
   * The split code of the transaction split.
   * e.g `SPL_98WF13Eb3w`
   */
  split_code?: string;
  /**
   * The code for the subaccount that owns the payment e.g `ACCT_8f4s1eq7m16rlzj`
   */
  subaccount?: string;
  /**
   * A flat fee to charge the subaccount for this transaction ().
   * This overrides the split percentage set when the subaccount
   * was created. Ideally, you will need to use this if you are
   * splitting in flat rates (since subaccount creation only allows
   * for percentage split). e.g. `7000` for a 70 naira fiat fee.
   */
  transaction_charge?: number;
  /**
   * Who bears Paystack charges?
   * `account` or `subaccount` (defaults to `account`)
   */
  bearer?: string;
}

export interface Response {
  status: boolean;
  message: string;
}

export interface TransactionInitialized extends Response {
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface TransactionData extends Response {
  data: {
    amount: number;
    currency: string;
    transaction_date: Date;
    status: string;
    reference: string;
    domain: string;
    metadata: number;
    gateway_response: string;
    message?: string;
    channel: string;
    ip_address: string;
    log: [
      {
        time_spent: number;
        attempt: number;
        authentication: any;
        errors: number;
        success: boolean;
        mobile: boolean;
        input: [];
        channel: string;
        history: [
          {
            type: string;
            message: string;
            time: number;
          },
        ];
      },
    ];
    fees: number;
    authorization: Authorization;
    customer: Customer;
    pin: string;
    required_amount: number;
  };
}

export interface ListTransactions extends Response {
  data: TransactionData[];
  meta: Meta;
}

export interface Timeline extends Response {
  data: {
    time_spent: number;
    attempts: number;
    authentication: any;
    errors: number;
    success: boolean;
    mobile: boolean;
    input: [];
    channel: string;
    history: [
      {
        type: string;
        message: string;
        time: number;
      },
    ];
  };
}

export interface ExportTransaction extends Response {
  data: {
    path: string;
  };
}

export interface ListTransactionQueryParams {
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
   * Filter transactions by status ('failed', 'success', 'abandoned')
   */
  status?: string;
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
  /**
   * Filter transactions by amount.
   * Specify the amount (in **kobo** if currency is `NGN`,
   * **pesewas**, if currency is `GHS`,
   * and **cents**, if currency is `ZAR`)
   */
  amount?: number;
}

export interface ChargeAuthorization {
  /**
   * Amount should be in kobo if currency is `NGN`, *pesewas*,
   * if currency is `GHS`, and cents, if currency is `ZAR`
   */
  amount: string;
  /**
   * Customer's email address
   */
  email: string;
  /**
   * Valid authorization code to charge
   */
  authorization_code: string;
  /**
   * Unique transaction reference. Only `-`, `.`,`=`
   * and alphanumeric characters allowed
   */
  reference?: string;
  /**
   * Currency in which amount shoud be charged.
   * Allowed values are: NGN,GHS,ZAR or USD
   */
  currency?: string;
  /**
   * Stringified JSON object. Add a custom_fields attribute which has
   * an array of objects if you would like the fields to be added to your
   * transaction when displayed on the dashboard.
   * @example {
   * "custom_fields": [{"display_name": "Cart ID","variable_name": "cart_id","value": "8393"}]}
   */
  metadata?: Record<string, unknown>;
  /**
   * Send us 'card' or 'bank' or 'card','bank' as an array to specify what
   * options to show the user paying
   */
  channels?: string[];
  /**
   * The code for the subaccount that owns the payment.
   * @exmple ACCT_8f4s1eq7ml6rlzj
   */
  subaccount?: string;
  /**
   * A flat fee to charge the subaccount for this transaction (in kobo if currency is NGN,
   * pesewas, if currency is GHS, and cents, if currency is ZAR). This overrides the split percentage
   * set when the subaccount was created. Ideally, you will need to use this if you are splitting in
   * flat rates (since subaccount creation only allows for
   */
  transaction_charge?: number;
  /**
   * Who bears Paystack charges? `account` or `subaccount` (defaults to `account`).
   */
  bearer?: string;
  /**
   * If you are making a scheduled charge call, it is a good idea to queue them so the processing
   * system does not get overloaded causing transaction processing errors. Send queue:true
   * to take advantage of our queued charging.
   */
  queue?: boolean;
}

export interface CheckAuthorization {
  /**
   * Amount should be in kobo if currency is `NGN`,
   * pesewas, if currency is `GHS`, and cents, if currency is `ZAR`
   */
  amount: string;
  /**
   * Customer's email address
   */
  email: string;
  /**
   * Valid authorization code to charge
   */
  authorization_code: string;
  /**
   * Currency in which amount should be charged.
   * Allowed values are: `NGN`, `GHS`, `ZAR` or `USD`
   */
  currency?: string;
}

export interface PartialDebit {
  /**
   * Authorization Code
   */
  authorization_code: string;
  /**
   * Specify the currency you want to debit.
   * Allowed values are `NGN`, `GHS`, `ZAR` or `USD`.
   */
  currency: string;
  /**
   * Amount should be in *kobo* if currency is NGN,
   * pesewas, if *currency* is `GHS`, and *cents*, if currency is `ZAR`
   */
  amount: string;
  /**
   * Customer's email address (attached to the authorization code)
   */
  email: string;
  /**
   * Unique transaction reference.
   * Only `-`, `.`, `=` and alphanumeric characters allowed.
   */
  reference: string;
  /**
   * Minimum amount to charge
   */
  at_least: string;
}

export interface PartialDebitResponse extends Response {
  data: Record<string, any>;
}

export interface CheckAuthorizationResponse extends Response {
  data: {
    amount: string;
    currency: string;
  };
}
