import { Axios } from 'axios';
import { BadRequest } from '../interface';
import {
  AddEvidence,
  AddEvidenceResponse,
  ExportDisputesResponse,
  FetchDisputeResponse,
  ListDisputesQueryParams,
  ListDisputesResponse,
  ResolveDispute,
  UpdateDispute,
  UpdateDisputeResponse,
  UploadUrlResponse,
} from './interface';

export class Dispute {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async list(
    queryParams?: ListDisputesQueryParams,
  ): Promise<ListDisputesResponse | BadRequest> {
    return await this.http.get('/dispute', {
      params: { ...queryParams },
    });
  }

  async fetch(id: string): Promise<FetchDisputeResponse | BadRequest> {
    return await this.http.get(`/dispute/${id}`);
  }

  async listTransactionDisputes(
    id: string,
  ): Promise<FetchDisputeResponse | BadRequest> {
    return await this.http.get(`/dispute/transaction/${id}`);
  }

  async update(
    id: string,
    data: UpdateDispute,
  ): Promise<UpdateDisputeResponse | BadRequest> {
    return await this.http.put(`/dispute/${id}`, JSON.stringify(data));
  }

  async addEvidence(
    id: string,
    data: AddEvidence,
  ): Promise<AddEvidenceResponse | BadRequest> {
    return await this.http.post(
      `/dispute/${id}/evidence`,
      JSON.stringify(data),
    );
  }

  async getUploadUrl(
    id: string,
    uploadFilename: string,
  ): Promise<UploadUrlResponse | BadRequest> {
    return await this.http.get(
      `/dispute/${id}/upload_url`,
      { params: { upload_filename: uploadFilename } },
    );
  }

  async resolve(
    id: string,
    data: ResolveDispute,
  ): Promise<FetchDisputeResponse | BadRequest> {
    return await this.http.put(
      `/dispute/${id}/resolve`,
      JSON.stringify(data),
    );
  }

  async export(
    queryParams?: ListDisputesQueryParams,
  ): Promise<ExportDisputesResponse | BadRequest> {
    return await this.http.get('/dispute/export', {
      params: { ...queryParams },
    });
  }
}
