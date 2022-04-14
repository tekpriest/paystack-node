import { Axios } from 'axios';
import {
  CreateDedicatedVirtualAccount,
  DeactivateDedicatedAccountResponse,
  DedicatedAccountCreatedResponse,
  FetchBankProvidersResponse,
  FetchDedicatedVirtualAccountResponse,
  ListDedicatedVirtualAccountsQueryParams,
  ListDedicatedVirtualAccountsResponse,
  RemoveSplitDedicatedAccountResponse,
  SplitDedicatedAccountTransaction,
  SplitDedicatedAccountTransactionResponse,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
}

export class DedicatedAccount {
  http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async create(
    data: CreateDedicatedVirtualAccount,
  ): Promise<DedicatedAccountCreatedResponse | BadRequest> {
    return await this.http.post<
      DedicatedAccountCreatedResponse | BadRequest,
      any
    >('/dedicated_account', data);
  }

  async list(
    queryParams: ListDedicatedVirtualAccountsQueryParams,
  ): Promise<ListDedicatedVirtualAccountsResponse | BadRequest> {
    return await this.http.get<
      ListDedicatedVirtualAccountsResponse | BadRequest,
      any
    >('/dedicated_account', { params: { ...queryParams } });
  }

  async fetch(
    dedicatedAccountId: string,
  ): Promise<FetchDedicatedVirtualAccountResponse | BadRequest> {
    return await this.http.get<
      FetchDedicatedVirtualAccountResponse | BadRequest,
      any
    >(`/dedicated_account/${dedicatedAccountId}`);
  }

  async deactivate(
    dedicatedAccountId: string,
  ): Promise<DeactivateDedicatedAccountResponse | BadRequest> {
    return await this.http.delete<
      DeactivateDedicatedAccountResponse | BadRequest,
      any
    >(`/dedicated_account/${dedicatedAccountId}`);
  }

  async splitTransaction(
    data: SplitDedicatedAccountTransaction,
  ): Promise<SplitDedicatedAccountTransactionResponse | BadRequest> {
    return await this.http.post<
      SplitDedicatedAccountTransactionResponse | BadRequest,
      any
    >('/dedicated_account/split', data);
  }

  async removeSplit(
    accountNumber: string,
  ): Promise<RemoveSplitDedicatedAccountResponse | BadRequest> {
    return await this.http.delete<
      RemoveSplitDedicatedAccountResponse | BadRequest,
      any
    >('/dedicated_account/split', { data: { account_number: accountNumber } });
  }

  async providers(): Promise<FetchBankProvidersResponse | BadRequest> {
    return await this.http.get<FetchBankProvidersResponse | BadRequest, any>(
      '/dedicated_account/available_providers',
    );
  }
}
