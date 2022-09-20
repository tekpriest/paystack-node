import { Axios } from 'axios';
import { ChargeCreatedWithAddressResponse, ChargeCreatedWithBirthdayResponse, ChargeCreatedWithOTPResponse, ChargeCreatedWithPendingResponse, ChargeCreatedWithPhoneResponse } from '.';
import {
  ChargeCreatedResponse,
  ChargeCreatedWithPinResponse,
  CreateCharge,
  SubmitAddress,
  SubmitBirthday,
  SubmitOTP,
  SubmitPhone,
  SubmitPIN,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
}

export class Charge {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }
  async create(
    data: CreateCharge,
  ): Promise<ChargeCreatedResponse | BadRequest> {
    return await this.http.post('/charge', JSON.stringify(data));
  }

  async submitPIN(data: SubmitPIN): Promise<ChargeCreatedWithPinResponse | BadRequest> {
    return await this.http.post('/charge/submit_pin', JSON.stringify(data));
  }

  async submitOTP(
    data: SubmitOTP,
  ): Promise<ChargeCreatedWithOTPResponse | BadRequest> {
    return await this.http.post('/charge/submit_otp', JSON.stringify(data));
  }

  async submitPhone(
    data: SubmitPhone,
  ): Promise<ChargeCreatedWithPhoneResponse | BadRequest> {
    return await this.http.post('/charge/submit_phone', JSON.stringify(data));
  }

  async submitBirthday(
    data: SubmitBirthday,
  ): Promise<ChargeCreatedWithBirthdayResponse | BadRequest> {
    return await this.http.post(
      '/charge/submit_birthday',
      JSON.stringify(data),
    );
  }

  async submitAddress(
    data: SubmitAddress,
  ): Promise<ChargeCreatedWithAddressResponse | BadRequest> {
    return await this.http.post('/charge/submit_address', JSON.stringify(data));
  }

  async checkPending(
    reference: string,
  ): Promise<ChargeCreatedWithPendingResponse | BadRequest> {
    return await this.http.get('/charge/submit_address', {
      params: { reference },
    });
  }
}
