import { Response } from '../interface';

export type Bank = {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway?: string;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

type RelationshipType =
  | 'currency'
  | 'integration_feature'
  | 'integration_type'
  | 'payment_method';

type Relationship = {
  [K in RelationshipType]: {
    type: K;
    data: string[];
  };
};

export type Country = {
  id: number;
  name: string;
  iso_code: string;
  default_currency_code: string;
  integration_defaults: Record<string, any>;
  relationships: Relationship;
};

export type State = {
  name: string;
  slug: string;
  abbreviation: string;
};

export type ListBanksQueryParams = {
  /**
   * The country from which to obtain the list of supported banks.
   * Accepted values are: `ghana`, `kenya`, `nigeria`, `south africa`
   */
  country?: string;

  /**
   * Flag to enable cursor pagination on the endpoint
   */
  use_cursor?: boolean;

  /**
   * The number of objects to return per page.
   * Defaults to `50`, and limited to `100` records per page.
   */
  perPage?: number;

  /**
   * A flag to filter for available banks a customer can make
   * a transfer to complete a payment
   */
  pay_with_bank_transfer?: boolean;

  /**
   * A flag to filter for banks a customer can pay directly from
   */
  pay_with_bank?: boolean;

  /**
   * A flag to filter the banks that are supported for account
   * verification in South Africa. You need to combine this with
   * either the currency or country filter.
   */
  enabled_for_verification?: boolean;

  /**
   * A cursor that indicates your place in the list.
   * It can be used to fetch the next page of the list
   */
  next?: string;

  /**
   * A cursor that indicates your place in the list.
   * It should be used to fetch the previous page of the list
   * after an initial next request
   */
  previous?: string;

  /**
   * The gateway type of the bank.
   * It can be one of these: `['emandate', 'digitalbankmandate']`
   */
  gateway?: string;

  /**
   * Type of financial channel.
   * For Ghanaian channels, please use either **mobile_money** for
   * mobile money channels OR **ghipps** for bank channels
   */
  type?: string;

  /**
   * One of the [supported currency](https://paystack.com/docs/api/#supported-currency)
   */
  currency?: string;

  /**
   * A flag that returns Nigerian banks with their nip institution code.
   * The returned value can be used in identifying institutions on NIP.
   */
  include_nip_sort_code?: string;
};

export interface BanksResponse extends Response {
  data: Bank[];
}

export interface CountriesResponse extends Response {
  data: Country[];
}

export interface StatesResponse extends Response {
  data: State[];
}
