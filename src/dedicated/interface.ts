import { Authorization, Customer } from "../charge";
import { Meta } from "../interface";
import { Subscription } from "../subscription";
import { Response, TransactionData } from "../transaction";

export interface DedicatedAccountData {
  id: number;
  account_name: string;
  account_number: string;
  assigned: boolean;
  currency: string;
  metadata: Record<string, any> | null;
  active: boolean;
  split_config: Record<string, any> | null;
  bank: Bank
  slug: string;
  created_at: string;
  updated_at: string;
  assignment: Assignment;
  customer: Customer
}

export interface CreateDedicatedVirtualAccount {
  customer: string;
  preferred_bank: string;
  subaccount?: string;
  split_code?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface ListDedicatedVirtualAccountsQueryParams {
  active: boolean;
  currency: string;
  provider_slug?: string;
  bank_id?: string;
  customer?: string;
}

export interface SplitDedicatedAccountTransaction {
  customer: string;
  subaccount?: string;
  split_code?: string;
  preferred_bank?: string;
}

export interface ListDedicatedVirtualAccountsResponse extends Response {
  data: DedicatedAccountData[];
  meta: Meta
}

export interface DedicatedAccountCreatedResponse extends Response {
  data: DedicatedAccountData
}

export interface FetchDedicatedVirtualAccountResponse extends Response {
  data: {
    transactions: TransactionData[];
    subscriptions: Subscription[];
    authorizations: Authorization[];
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    metadata: Record<string, any> | null;
    domain: string;
    customer_code: string;
    risk_action: string;
    id: number;
    integration: number;
    createdAt: Date;
    updatedAt: Date;
    created_at: Date;
    updated_at: Date;
    total_transactions: number;
    total_transaction_value: Array<Record<string, any> | string | number>;
    dedicated_account: {
      id: number;
      account_name: string;
      account_number: string;
      created_at: Date;
      updated_at: Date;
      currency: string;
      active: boolean;
      assigned: boolean;
      provider: {
        id: number;
        provider_slug: string;
        bank_id: number;
        bank_name: string;
      }
      assignment: Assignment
    }
  }
}

export interface DeactivateDedicatedAccountResponse {
  data: {
    bank: Bank
    account_name: string;
    account_number: string;
    assigned: boolean;
    currency: string;
    metadata: Record<string, any> | null;
    active: boolean;
    id: number;
    created_at: Date;
    updated_at: Date;
    assignment: Assignment
  }
}

export interface SplitDedicatedAccountTransactionResponse extends Response {
  data: {
    id: number
    account_name: string;
    account_number: string;
    assigned: boolean;
    currency: string;
    metadata: Record<string, any> | null;
    active: boolean;
    bank: Bank;
    assignment: Assignment;
    created_at: Date;
    updated_at: Date;
    split_config: Record<string, any> | null;
    customer: Customer
  }
}

export interface RemoveSplitDedicatedAccount extends Response {
  data: {
    id: number
    account_name: string;
    account_number: string;
    assigned: boolean;
    currency: string;
    split_config: Record<string, any> | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}

export interface FetchBankProvidersResponse extends Response {
  data: {
    id: number;
    provider_slug: string;
    bank_id: number;
    bank_name: string;
  }[]
}

interface Bank {
  id: number;
  name: string;
  slug: string;
}

interface Assignment {
  integration: number;
  assignee_id: number;
  assignee_type: string;
  expired: boolean;
  account_type: string;
  assigned_at: Date
  expired_at: Date | null;
}
