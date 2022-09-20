import { Axios } from 'axios';
import { Control } from './control';
import {
  BulkTransferInitiated,
  FetchTransfer,
  FinalizeTransfer,
  InitiateBulkTransfer,
  InitiateTransfer,
  ListTransferQueryParams,
  ListTransfers,
  TransferInitiated,
  VerifyTransfer,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
}

export class Transfer {
  http: Axios;
  public control: Control;
  constructor(http: Axios) {
    this.http = http;
    this.control = new Control(http);
  }

  /**
   * # Initiate Transfer
   * Status of transfer object returned will be `pending` if OTP is disabled.
   * In the event that an OTP is required, status will read `otp`.
   */
  async initiate(
    data: InitiateTransfer,
  ): Promise<TransferInitiated | BadRequest> {
    return await this.http.post('/transfer', JSON.stringify(data));
  }

  /**
   * # Finalize Transfer
   * Finalize an initiated transfer
   */
  async finalize(
    transferCode: string,
    otp: string,
  ): Promise<FinalizeTransfer | BadRequest> {
    return await this.http.post(
      '/transfer/finalize_transfer',
      JSON.stringify({ transfer_code: transferCode, otp }),
    );
  }

  async bulk(
    data: InitiateBulkTransfer,
  ): Promise<BulkTransferInitiated | BadRequest> {
    return await this.http.post('/transfer/bulk', JSON.stringify(data));
  }

  async list(
    queryParams?: ListTransferQueryParams,
  ): Promise<ListTransfers | BadRequest> {
    return await this.http.get('/transfer', {
      params: { ...queryParams },
    });
  }

  async fetch(idOrCode: string): Promise<FetchTransfer | BadRequest> {
    return await this.http.get(`/transfer/${idOrCode}`);
  }

  async verify(reference: string): Promise<VerifyTransfer | BadRequest> {
    return await this.http.get(`transfer/verify/${reference}`);
  }
}
