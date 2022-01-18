import { Axios } from 'axios';
import {
  CreateSubscription,
  EnableOrDisableSubscription,
  FetchSubscription,
  GenerateSubscriptionLink,
  ListSubscriptionQueryParams,
  ListSubscriptions,
  Response,
  SubscriptionCreated,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
}

export class Subscription {
  http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async create(
    data: CreateSubscription,
  ): Promise<SubscriptionCreated | BadRequest> {
    const response = await this.http.post<
      SubscriptionCreated | BadRequest,
      any
    >('/subscription', JSON.stringify(data));
    return response;
  }

  async list(
    queryParams?: ListSubscriptionQueryParams,
  ): Promise<ListSubscriptions | BadRequest> {
    return await this.http.get<ListSubscriptions | BadRequest, any>(
      '/subscription',
      { params: { ...queryParams } },
    );
  }

  async fetch(idOrCode: string): Promise<FetchSubscription | BadRequest> {
    return await this.http.get<FetchSubscription | BadRequest, any>(
      `/subscription/${idOrCode}`,
    );
  }

  async enable(
    data: EnableOrDisableSubscription,
  ): Promise<Response | BadRequest> {
    return await this.http.post<Response | BadRequest, any>(
      '/subscription/enable',
      JSON.stringify(data),
    );
  }
  async disable(
    data: EnableOrDisableSubscription,
  ): Promise<Response | BadRequest> {
    return await this.http.post<Response | BadRequest, any>(
      '/subscription/disable',
      JSON.stringify(data),
    );
  }

  async generateSubscriptionLink(
    code: string,
  ): Promise<GenerateSubscriptionLink | BadRequest> {
    return await this.http.get<GenerateSubscriptionLink | BadRequest, any>(
      `/subscription/${code}/manage/link`,
    );
  }

  async sendUpdateSubscriptionLink(
    code: string,
  ): Promise<Response | BadRequest> {
    return await this.http.post<Response | BadRequest, any>(
      `/subscription/${code}/manage/email`,
    );
  }
}
