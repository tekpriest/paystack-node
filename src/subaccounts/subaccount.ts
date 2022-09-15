import { Axios } from 'axios';
import { BadRequest } from '../interface';
import {
  CreateUpdateSubAccount,
  FetchSubAccountResponse,
  ListSubAccountsResponse,
  SubAccountCreatedUpdateResponse,
  SubAccountQueryParams,
} from './interface';

export class SubAccount {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async create(
    data: CreateUpdateSubAccount,
  ): Promise<SubAccountCreatedUpdateResponse | BadRequest> {
    return await this.http.post('/subaccount', JSON.stringify(data));
  }

  async list(
    queryParams?: SubAccountQueryParams,
  ): Promise<ListSubAccountsResponse> {
    return await this.http.get('/subaccount', { params: { ...queryParams } });
  }

  async fetch(id: string): Promise<FetchSubAccountResponse | BadRequest> {
    return await this.http.get(`/subaccount/${id}`);
  }

  async update(
    id: string,
    data: CreateUpdateSubAccount,
  ): Promise<SubAccountCreatedUpdateResponse | BadRequest> {
    return await this.http.put(`/subaccount/${id}`, JSON.stringify(data));
  }
}
