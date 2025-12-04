import { Axios } from 'axios';
import { BadRequest } from '../interface';
import {
  DomainRegisterResponse,
  ListApplePayQueryParams,
  ListDomainsResponse,
  UnregisterDomainRegisterResponse,
} from './interface';

export class ApplePay {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async registerDomain(
    domainName: string,
  ): Promise<DomainRegisterResponse | BadRequest> {
    return await this.http.post(
      '/apple-pay/domain',
      JSON.stringify({ domainName }),
    );
  }

  async listDomains(
    queryParams?: ListApplePayQueryParams,
  ): Promise<ListDomainsResponse | BadRequest> {
    return await this.http.request({
      url: '/apple-pay',
      params: { ...queryParams },
      method: 'get',
    });
  }

  async unregisterDomain(
    domainName: string,
  ): Promise<UnregisterDomainRegisterResponse | BadRequest> {
    return await this.http.delete('/apple-pay', {
      params: { domainName },
    });
  }
}
