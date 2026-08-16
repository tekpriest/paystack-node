import { HttpClient } from '../http';
import { BadRequest } from '../interface';
import {
  FetchTimeoutResponse,
  UpdateTimeout,
  UpdateTimeoutResponse,
} from './interface';

export class Integration {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async fetchTimeout(): Promise<FetchTimeoutResponse | BadRequest> {
    return await this.http.get('/integration/payment_session_timeout');
  }

  async updateTimeout(
    data: UpdateTimeout,
  ): Promise<UpdateTimeoutResponse | BadRequest> {
    return await this.http.put(
      '/integration/payment_session_timeout',
      JSON.stringify(data),
    );
  }
}
