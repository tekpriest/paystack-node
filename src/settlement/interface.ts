import { Authorization } from '../charge/interface';
import { Customer, CustomerSubAccount } from '../customer/interface';
import { Meta, QueryParams, Response } from '../interface';
import { SubAccount } from '../subaccounts/interface';

export interface SettlementQueryParams extends QueryParams {
  subaccount?: string;
}

export interface Settlement {
  integration: number;
  settled_by?: string;
  settlement_date: Date;
  domain: string;
  total_amount: number;
  total_fees: number;
  status: string;
  id: number;
  createdAt: Date;
  updatedAt?: Date;
  subaccount: CustomerSubAccount;
}

export interface ListSettlementsResponse extends Response {
  data: Settlement[];
  meta: Meta;
}
type CustomerResponse = Omit<Customer,
  'transactions' |
  'subscriptions' |
  'authorizations' |
  'domain' |
  'international_format_phone' |
  'integration' |
  'createdAt' |
  'updatedAt' |
  'identified' |
  'identifications' |
  'dedicated_account'
>;
type SubAccountResponse = Omit<SubAccount, 
  'domain' | 
  'is_verified' | 
  'settlement_schedule' | 
  'active' | 
  'migrate' | 
  'integration' | 
  'createdAt' | 
  'updatedAt' | 
  'currency'
>;
export interface SettlementTransaction {
  id: number;
  reference: string;
  amount: number;
  created_at: Date;
  paidAt: Date;
  currency: string;
  channel: string;
  domain: string;
  message?: string;
  gateway_response: string;
  fees: number;
  metadata: Record<string,unknown>;
  customer: CustomerResponse;
  authorization: Authorization
  subaccount: SubAccountResponse;
}

export interface ListSettlementTransactionsResponse extends Response {
  data: SettlementTransaction[];
  meta: Meta & { total_volume: number };
}
