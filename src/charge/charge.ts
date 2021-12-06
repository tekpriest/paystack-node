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
  submitPIN(data: SubmitPIN): Promise<ChargeCreated | BadRequest>;
  submitOTP(data: SubmitOTP): Promise<ChargeCreated | BadRequest>;
  submitPhone(data: SubmitPhone): Promise<ChargeCreated | BadRequest>;
  submitBirthday(data: SubmitBirthday): Promise<ChargeCreated | BadRequest>;
  submitAddress(data: SubmitAddress): Promise<ChargeCreated | BadRequest>;
  checkPending(reference: string): Promise<ChargeCreated | BadRequest>;
}

export class Charge implements ICharge {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }
  async create(data: CreateCharge): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post('/charge', JSON.stringify(data));
    return JSON.parse(response.data);
  }

  async submitPIN(data: SubmitPIN): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post(
      '/charge/submit_pin',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }

  async submitOTP(data: SubmitOTP): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post(
      '/charge/submit_otp',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }

  async submitPhone(data: SubmitPhone): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post(
      '/charge/submit_phone',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }

  async submitBirthday(
    data: SubmitBirthday,
  ): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post(
      '/charge/submit_birthday',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }

  async submitAddress(
    data: SubmitAddress,
  ): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post(
      '/charge/submit_address',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }

  async checkPending(reference: string): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.get('/charge/submit_address', {
      params: { reference },
    });
    return JSON.parse(response.data);
  }
}
