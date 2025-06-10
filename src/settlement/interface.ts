import { CustomerSubAccount } from '../customer/interface';
import { Meta, QueryParams, Response } from '../interface';

export interface SettlementQueryParams extends QueryParams {
  subaccount?: string;
}

export interface Settlement {
  integration: number;
  settled_by?: string;
  settlement_date: Date;
  domain: string;
  total_amount: number;
  total_fees:number;
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
}

export interface ListSettlementTransactionsResponse extends Response {
  data: SettlementTransaction[];
  meta: Meta & { total_volume: number };
}
