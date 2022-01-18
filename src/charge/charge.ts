import { Axios } from 'axios';
import {
  ChargeCreated,
  ChargeCreatedResponse,
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
    return await this.http.post<ChargeCreatedResponse | BadRequest, any>(
      '/charge',
      JSON.stringify(data),
    );
  }

  async submitPIN(data: SubmitPIN): Promise<ChargeCreated | BadRequest> {
    return await this.http.post<ChargeCreatedResponse | BadRequest, any>(
      '/charge/submit_pin',
      JSON.stringify(data),
    );
  }

  async submitOTP(
    data: SubmitOTP,
  ): Promise<ChargeCreatedResponse | BadRequest> {
    return await this.http.post<ChargeCreatedResponse | BadRequest, any>(
      '/charge/submit_otp',
      JSON.stringify(data),
    );
  }

  async submitPhone(
    data: SubmitPhone,
  ): Promise<ChargeCreatedResponse | BadRequest> {
    return await this.http.post<ChargeCreatedResponse | BadRequest, any>(
      '/charge/submit_phone',
      JSON.stringify(data),
    );
  }

  async submitBirthday(
    data: SubmitBirthday,
  ): Promise<ChargeCreatedResponse | BadRequest> {
    return await this.http.post<ChargeCreatedResponse | BadRequest, any>(
      '/charge/submit_birthday',
      JSON.stringify(data),
    );
  }

  async submitAddress(
    data: SubmitAddress,
  ): Promise<ChargeCreatedResponse | BadRequest> {
    return await this.http.post<ChargeCreatedResponse | BadRequest, any>(
      '/charge/submit_address',
      JSON.stringify(data),
    );
  }

  async checkPending(
    reference: string,
  ): Promise<ChargeCreatedResponse | BadRequest> {
    return await this.http.get<ChargeCreatedResponse | BadRequest, any>(
      '/charge/submit_address',
      {
        params: { reference },
      },
    );
  }
}
