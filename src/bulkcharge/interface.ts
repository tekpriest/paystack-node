import { Charge } from "../charge/interface";
import { Meta, QueryParams, Response } from "../interface";

export interface InitiateBulkCharge {
  authorization: string;
  amount: number;
  reference: string;
}

export interface BulkCharge {
  id: number;
  domain: string;
  batch_code: string;
  status: 'active'|'paused'|'complete';
  integration?: number;
  reference?: string;
  total_charges?: number;
  pending_charges?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListBulkChargeBatchesResponse extends Response {
  data: BulkCharge[];
  meta: Meta;
}

export interface InitiateBulkChargeResponse extends Response {
  data: BulkCharge
}

export interface FetchBulkBatchChargeResponse extends Response {
  data: BulkCharge
}

export interface FetchChargesInBatchResponse extends Response {
  data: Charge
}

export interface QueryBatchChargesParams extends QueryParams {
  status: 'pending'|'success'|'failed';
}
