export interface Meta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export interface BadRequest {
  status: boolean;
  message: string;
  data: null;
}

export interface Response {
  status: boolean;
  message: string;
}

export interface QueryParams {
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
   * A timestamp from which to start listing subaccounts e.g. 2016-09-24T00:00:05.000Z, 2016-09-21
   */
  from?: Date;
  /**
   * A timestamp at which to stop listing subaccounts e.g. 2016-09-24T00:00:05.000Z, 2016-09-21
   */
  to?: Date;
}

/**
 * Paystack makes use of the ISO 4217 format for currency codes.
 * When sending an amount, it must be sent in the subunit of that currency.
 *
 * Sending an amount in subunits simply means multiplying the base amount by 100.
 * For example, if a customer is supposed to make a payment of NGN 100,
 * you would send 10000 = 100 * 100 in your request.
 */
export type Currency = 'NGN' | 'USD' | 'GHS' | 'ZAR' | 'KES';
