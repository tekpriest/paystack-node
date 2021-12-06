import { Authorization, Customer } from '../charge';

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
   * Unique transaction reference. Only `-`,`.`,`_`
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

export interface TransactionResponse {
  status: boolean;
  message: string;
  data: TransactionInitializedOk | TransactionData | Transactions;
  meta?: Meta;
}

interface TransactionInitializedOk {
  authorization_url: string;
  access_code: string;
  reference: string;
}

interface TransactionData {
  amount: number;
  currency: string;
  transaction_date: Date;
  status: string;
  reference: string;
  domain: string;
  metadata: number;
  gateway_response: string;
  message?: null;
  channel: string;
  ip_address: string;
  log: {
    time_spent: number;
    attempt: number;
    authentication: any;
    errors: number;
    success: boolean;
    mobile: boolean;
    input: [];
    channel: any;
    history: {
      type: string;
      message: string;
      time: number;
    }[];
  };
  fees: any;
  authorization: Authorization;
  customer: Customer;
  pin: string;
  required_amount: number;
}

interface Transactions extends TransactionData {}
[];

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
  from: Date;
  /**
   * A timestamp from which to stop listing transaction
   * e.g `2021-10-25T00.00.05.000z`, `2021-12-25`
   */
  to: Date;
  /**
   * Filter transactions by amount.
   * Specify the amount (in **kobo** if currency is `NGN`,
   * **pesewas**, if currency is `GHS`,
   * and **cents**, if currency is `ZAR`)
   */
  amount: number;
}

export interface Meta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}
