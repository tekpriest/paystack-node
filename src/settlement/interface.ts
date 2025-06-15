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
  total_processed: number;
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
type CustomerType = Pick<
  Customer,
  | 'id'
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'metadata'
  | 'customer_code'
  | 'risk_action'
>;
type SubAccountType = Pick<
  SubAccount,
  | 'id'
  | 'subaccount_code'
  | 'business_name'
  | 'description'
  | 'primary_contact_name'
  | 'primary_contact_email'
  | 'primary_contact_phone'
  | 'metadata'
  | 'percentage_charge'
  | 'settlement_bank'
  | 'account_number'
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
  customer: CustomerType;
  authorization: Authorization
  subaccount: SubAccountResponse;
}

export interface ListSettlementTransactionsResponse extends Response {
  data: SettlementTransaction[];
  meta: Meta & { total_volume: number };
}
