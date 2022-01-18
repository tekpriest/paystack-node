import { Authorization } from '../charge';
import { Meta, Subscription, TransactionData } from '../transaction';

export interface CreateCustomer {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  metadata?: Record<string, any>;
}

export interface Response {
  status: boolean;
  message: string;
}

export interface CustomerCreated extends Response {
  data: {
    transactions: TransactionData[];
    subscriptions: Subscription[];
    authorizations: Authorization[];
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    metadata: Record<string, any> | null;
    domain: string;
    customer_code: string;
    risk_action: string;
    id: number;
    integration: number;
    createdAt: Date;
    updatedAt: Date;
    identified: boolean;
    identifications: null;
  };
}

export interface CustomerData extends Response {
  data: {
    integration: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    dedicated_account: DedicatedAccount | null;
    identified: boolean;
    identifications: CustomerIdentification[] | null;
    metadata: Record<string, any> | null;
    domain: string;
    customer_code: string;
    id: string;
    transactions: TransactionData[];
    subscriptions: Subscription[];
    authorizations: Authorization[];
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ListCustomersResponse extends Response {
  data: [
    {
      integration: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      domain: string;
      customer_code: string;
      id: number;
      createdAt: Date;
      updatedAt: Date;
    },
  ];
  meta: Meta;
}

export interface ListCustomerQueryParams {
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
}

export interface SplitConfig {
  id: number;
  name: string;
  type: string;
  currency: string;
  integration: number;
  domain: string;
  split_code: string;
  active: boolean;
  bearer_type: string;
  bearer_subaccount: string | null;
  createdAt: Date;
  updatedAt: Date;
  is_dynamic: boolean;
  subaccounts: SubAccount[];
  total_subaccounts: number;
}

export interface SubAccount {
  subaccount: {
    id: number;
    sunaccount_code: string;
    business_name: string;
    description: string;
    primary_contact_name: string | null;
    primary_contact_email: string | null;
    primary_contact_phone: string | null;
    metadata: Record<string, any>;
    settlement_bank: string;
    currency: string;
    account_number: string;
  };
  share: number;
}

export interface CustomerIdentification {
  country: string;
  type: string;
  value: string;
}

export interface DedicatedAccount {
  bank: {
    name: string;
    id: number;
    slug: string;
  };
  id: number;
  account_name: string;
  account_number: string;
  created_at: Date;
  updated_at: Date;
  currency: string;
  split_config: SplitConfig;
  active: boolean;
  assigned: boolean;
  assignment: {
    assignee_id: number;
    assignee_type: string;
    account_type: string;
    integration: number;
  };
}

export interface UpdateCustomer {
  first_name: string;
  last_name: string;
  phone: string;
  metadata: Record<string, any>;
}

export interface SetRiskAction {
  customer: string;
  risk_action: RiskAction;
}

export interface ValidateCustomer {
  first_name: string;
  last_name: string;
  type: ValidationType;
  value: string;
  country: string;
  bvn: string;
  bank_code: string;
  account_number: string;
}

enum RiskAction {
  default,
  allow,
  deny,
}

enum ValidationType {
  bvn,
  bank_account,
}

export interface ICustomer {
  integration: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  dedicated_account: DedicatedAccount | null;
  identified: boolean;
  identifications: CustomerIdentification[] | null;
  metadata: Record<string, unknown> | null;
  domain: string;
  customer_code: string;
  id: string;
  transactions: TransactionData[];
  subscriptions: Subscription[];
  authorizations: Authorization[];
  createdAt: Date;
  updatedAt: Date;
}
