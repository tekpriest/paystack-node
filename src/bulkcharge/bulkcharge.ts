import { Axios } from 'axios';
import { BadRequest, QueryParams, Response } from '../interface';
import {FetchBulkBatchChargeResponse, FetchChargesInBatchResponse, InitiateBulkCharge, InitiateBulkChargeResponse, ListBulkChargeBatchesResponse, QueryBatchChargesParams } from './interface';

export class BulkCharge {
  http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async initiate(data: InitiateBulkCharge[]): Promise<InitiateBulkChargeResponse |BadRequest> {
    return await this.http.post('/bulkcharge', JSON.stringify(data))
  }

  async list(queryParams?: QueryParams): Promise<ListBulkChargeBatchesResponse|BadRequest> {
    return await this.http.get('/bulkcharge', {params: {...queryParams}})
  }

  async fetchBulkCharge(id: string): Promise<FetchBulkBatchChargeResponse|BadRequest> {
    return await this.http.get(`/bulkcharge/${id}`)
  }

  async fetchBatchChrges(id: string, queryParams?: QueryBatchChargesParams): Promise<FetchChargesInBatchResponse|BadRequest> {
    return await this.http.get(`/bulkcharge/${id}/charges`,{params:{...queryParams}})
  }

  async pause(batchCode: string):Promise<Response|BadRequest> {
    return await this.http.get(`/bulkcharge/pause/${batchCode}`)
  }

  async resume(batchCode: string):Promise<Response|BadRequest> {
    return await this.http.get(`/bulkcharge/resume/${batchCode}`)
  }
}
