import { Axios } from 'axios';
import { BadRequest, QueryParams, Response } from '../interface';
import {
  CreateRecipient,
  ListRecipientResponse,
  RecipientCreatedResponse,
  UpdateRecipient,
  ViewRecipientResponse,
} from './interface';

export class Recipient {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  /**
   * Create multiple transfer recipients in batches.
   *  A duplicate account number will lead to the retrieval of the existing record.
   * If you set `isBulk` to true, you must set the data as an array of recipients
   */
  async create(
    data: CreateRecipient | CreateRecipient[],
    isBulk?: boolean,
  ): Promise<RecipientCreatedResponse | BadRequest> {
    let body: unknown;
    let url = '/transferrecipient';
    body = data;
    if (isBulk) {
      url += '/bulk';
      body = { batch: data };
    }

    return await this.http.post(url, JSON.stringify(body));
  }

  async list(
    queryParams?: QueryParams,
  ): Promise<ListRecipientResponse | BadRequest> {
    return await this.http.get('/transferrecipient', {
      params: { ...queryParams },
    });
  }

  async fetch(id: string): Promise<ViewRecipientResponse | BadRequest> {
    return await this.http.get(`/transferrecipient/${id}`);
  }

  async update(
    id: string,
    data: UpdateRecipient,
  ): Promise<ViewRecipientResponse | BadRequest> {
    return await this.http.put(
      `/transferrecipient/${id}`,
      JSON.stringify(data),
    );
  }

  async delete(id: string): Promise<Response | BadRequest> {
    return await this.http.delete(`/transferrecipient/${id}`);
  }
}
