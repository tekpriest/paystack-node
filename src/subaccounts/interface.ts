import { Response } from '../interface';

export interface CreateUpdateSubAccount {
  /**
   * Name of business for subaccount
   */
  business_name: string;
  /**
   * Bank Code for the bank.
   * You can get the list of Bank Codes by calling the List Banks endpoint.
   */
  settlement_bank: string;
  /**
   * Bank Account Number
   */
  account_number: string;

  /**
   * The default percentage charged when
   * receiving on behalf of this subaccount
   */
  percentage_charge: number;
  /**
   * A description for this subaccount
   */
  description: string;
  /**
   * A name for the contact person for this subaccoun
   */
  primary_contact_name?: string;
  /**
   * A contact email for the subaccount
   */
  primary_contact_email?: string;
  /**
   * A phone number to call for this subaccount
   */
  primary_contact_phone?: string;
  /**
   * Stringified JSON object.
   * Add a custom_fields attribute which has an
   * array of objects if you would like the
   * fields to be added to your transaction
   * when displayed on the dashboard.
   * Sample:
   * {
   *  "custom_fields": [
   *    {
   *      "display_name":"Cart ID",
   *      "variable_name": "cart_id",
   *         "value": "8393"
   *       }
   *     ]
   *   }
   */
  metadata?: string;
}

interface SubAccount {
  id: number;
  domain: string;
  subaccount_code: string;
  business_name: string;
  description?: string;
  primary_contact_name?: string;
  primary_contact_email?: string;
  primary_contact_phone?: string;
  metadata: Record<string, unknown>;
  percentage_charge: number;
  is_verified: boolean;
  settlement_bank: string;
  account_number: string;
  settlement_schedule: string;
  active: boolean;
  migrate: boolean;
  integration: number;
  createdAt: Date;
  updatedAt: Date;
  currency: string;
}

export interface SubAccountCreatedUpdateResponse extends Response {
  data: SubAccount;
}

export interface ListSubAccountsResponse extends Response {
  data: SubAccount[];
}

export interface FetchSubAccountResponse extends Response {
  data: SubAccount;
}
