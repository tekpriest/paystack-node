import { Axios } from 'axios';
import { BadRequest, Response } from '../interface';
import {
  CheckBalanceResponse,
  LedgerBalanceResponse,
  ResendTransferOTP,
} from './interface';

export class Control {
  http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async balance(): Promise<CheckBalanceResponse | BadRequest> {
    return await this.http.get('/balance');
  }

  async ledgerBalance(): Promise<LedgerBalanceResponse | BadRequest> {
    return await this.http.get('/balance/ledger');
  }

  async resendOTP(data: ResendTransferOTP): Promise<Response | BadRequest> {
    return await this.http.post('/transfer/resend_otp', JSON.stringify(data));
  }

  async disableOTP(): Promise<Response | BadRequest> {
    return await this.http.post('/transfer/disable_otp');
  }

  async finalizeDisableOTP(otp: string): Promise<Response | BadRequest> {
    return await this.http.post(
      '/transfer/disable_otp_finalize',
      JSON.stringify({ otp }),
    );
  }

  async enableOTP(): Promise<Response | BadRequest> {
    return await this.http.post('/transfer/enable_otp');
  }
}
