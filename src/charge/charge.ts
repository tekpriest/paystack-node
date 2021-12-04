import { Axios } from 'axios';
import {
  ChargeCreated,
  CreateCharge,
  SubmitAddress,
  SubmitBirthday,
  SubmitOTP,
  SubmitPhone,
  SubmitPIN,
} from '.';

interface BadRequest {
  status: boolean;
  message: string;
  data: null;
}

export interface ICharge {
  create(data: CreateCharge): Promise<ChargeCreated | BadRequest>;
}

export class Charge implements ICharge {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }
  async create(data: CreateCharge): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post<ChargeCreated | BadRequest>(
      '/charge',
      JSON.stringify(data),
    );
    return response.data;
  }

  async submitPIN(data: SubmitPIN): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post<ChargeCreated | BadRequest>(
      '/charge/submit_pin',
      JSON.stringify(data),
    );
    return response.data;
  }

  async submitOTP(data: SubmitOTP): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post<ChargeCreated | BadRequest>(
      '/charge/submit_otp',
      JSON.stringify(data),
    );
    return response.data;
  }

  async submitPhone(data: SubmitPhone): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post(
      '/charge/submit_phone',
      JSON.stringify(data),
    );
    return response.data;
  }

  async submitBirthday(
    data: SubmitBirthday,
  ): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post('/charge/submit_birthday');
    return response.data;
  }

  async submitAddress(
    data: SubmitAddress,
  ): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post(
      '/charge/submit_address',
      JSON.stringify(data),
    );
    return response.data;
  }

  async checkPendingCharge(
    reference: string,
  ): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.get('/charge/submit_address', {
      params: { reference },
    });
    return response.data;
  }
}
