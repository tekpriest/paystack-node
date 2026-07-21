import { Response } from '../interface';

export interface TriggerActivationCharge {
  customer_ids: number[];
}

export interface ListMandateAuthorizationsQueryParams {
  cursor?: string;
  status?: 'pending' | 'active' | 'revoked';
  per_page?: number;
}

export interface MandateAuthorizationCustomer {
  id: number;
  customer_code: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface MandateAuthorization {
  id: number;
  status: string;
  mandate_id: number;
  authorization_id: number;
  authorization_code: string;
  integration_id: number;
  account_number: string;
  bank_code: string;
  bank_name: string;
  customer: MandateAuthorizationCustomer;
  authorized_at: string;
}

export interface ActivationChargeResponse extends Response {
  message: string;
}

export interface ListMandateAuthorizationsResponse extends Response {
  data: MandateAuthorization[];
  meta: {
    per_page: number;
    next: string | null;
    count: number;
    total: number;
  };
}
