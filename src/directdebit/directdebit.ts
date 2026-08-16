import { HttpClient } from '../http';
import { BadRequest } from '../interface';
import {
  ActivationChargeResponse,
  ListMandateAuthorizationsQueryParams,
  ListMandateAuthorizationsResponse,
  TriggerActivationCharge,
} from './interface';

export class DirectDebit {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async activationCharge(
    data: TriggerActivationCharge,
  ): Promise<ActivationChargeResponse | BadRequest> {
    return await this.http.put(
      '/directdebit/activation-charge',
      JSON.stringify(data),
    );
  }

  async listMandateAuthorizations(
    queryParams?: ListMandateAuthorizationsQueryParams,
  ): Promise<ListMandateAuthorizationsResponse | BadRequest> {
    return await this.http.get('/directdebit/mandate-authorizations', {
      params: { ...queryParams },
    });
  }
}
