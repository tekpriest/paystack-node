import { Response } from '../interface';

export interface PaymentSessionTimeout {
  payment_session_timeout: number;
}

export interface FetchTimeoutResponse extends Response {
  data: PaymentSessionTimeout;
}

export interface UpdateTimeout {
  timeout: number;
}

export interface UpdateTimeoutResponse extends Response {
  data: PaymentSessionTimeout;
}
