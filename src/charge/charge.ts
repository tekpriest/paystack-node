import { Axios } from 'axios';
import {
  ChargeCreatedWithAddressResponse,
  ChargeCreatedWithBirthdayResponse,
  ChargeCreatedWithOTPResponse,
  ChargeCreatedWithPendingResponse,
  ChargeCreatedWithPhoneResponse,
} from './interface';
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
  /**
   * Initiate a payment by integrating the [payment channel](https://paystack.com/docs/payments/payment-channels/) of your choice.
   */
  async create(
    data: CreateCharge,
  ): Promise<ChargeCreatedResponse | BadRequest> {
    return await this.http.post('/charge', JSON.stringify(data));
  }

  /**
   * Submit PIN to continue a charge
   */
  async submitPIN(
    data: SubmitPIN,
  ): Promise<ChargeCreatedWithPinResponse | BadRequest> {
    return await this.http.post('/charge/submit_pin', JSON.stringify(data));
  }

  /**
   * Submit OTP to complete a charge
   */
  async submitOTP(
    data: SubmitOTP,
  ): Promise<ChargeCreatedWithOTPResponse | BadRequest> {
    return await this.http.post('/charge/submit_otp', JSON.stringify(data));
  }

  /**
   * Submit phone number when requested
   */
  async submitPhone(
    data: SubmitPhone,
  ): Promise<ChargeCreatedWithPhoneResponse | BadRequest> {
    return await this.http.post('/charge/submit_phone', JSON.stringify(data));
  }

  /**
   * Submit Birthday when requested
   */
  async submitBirthday(
    data: SubmitBirthday,
  ): Promise<ChargeCreatedWithBirthdayResponse | BadRequest> {
    return await this.http.post(
      '/charge/submit_birthday',
      JSON.stringify(data),
    );
  }

  /**
   * Submit address to continue a charge
   */
  async submitAddress(
    data: SubmitAddress,
  ): Promise<ChargeCreatedWithAddressResponse | BadRequest> {
    return await this.http.post('/charge/submit_address', JSON.stringify(data));
  }

  /**
   * When you get pending as a charge status or if there was an exception when calling any of the /charge endpoints,
   * wait 10 seconds or more, then make a check to see if its status has changed.
   * Don't call too early as you may get a lot more pending than you should.
   */
  async checkPending(
    reference: string,
  ): Promise<ChargeCreatedWithPendingResponse | BadRequest> {
    return await this.http.get('/charge/submit_address', {
      params: { reference },
    });
  }
}
