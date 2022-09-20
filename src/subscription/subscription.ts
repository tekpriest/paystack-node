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
    return await this.http.post('/subscription', JSON.stringify(data));
  }

  async list(
    queryParams?: ListSubscriptionQueryParams,
  ): Promise<ListSubscriptions | BadRequest> {
    return await this.http.get('/subscription', { params: { ...queryParams } });
  }

  async fetch(idOrCode: string): Promise<FetchSubscription | BadRequest> {
    return await this.http.get(`/subscription/${idOrCode}`);
  }

  async enable(
    data: EnableOrDisableSubscription,
  ): Promise<Response | BadRequest> {
    return await this.http.post('/subscription/enable', JSON.stringify(data));
  }
  async disable(
    data: EnableOrDisableSubscription,
  ): Promise<Response | BadRequest> {
    return await this.http.post('/subscription/disable', JSON.stringify(data));
  }

  async generateSubscriptionLink(
    code: string,
  ): Promise<GenerateSubscriptionLink | BadRequest> {
    return await this.http.get(`/subscription/${code}/manage/link`);
  }

  async sendUpdateSubscriptionLink(
    code: string,
  ): Promise<Response | BadRequest> {
    return await this.http.post(`/subscription/${code}/manage/email`);
  }
}
