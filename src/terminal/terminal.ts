import { Axios } from 'axios';
import { BadRequest, Response } from '../interface';
import {
  CommissionDevice,
  CommissionResponse,
  DecommissionDevice,
  DecommissionResponse,
  FetchEventStatusResponse,
  FetchTerminalResponse,
  FetchTerminalStatusResponse,
  ListTerminalsQueryParams,
  ListTerminalsResponse,
  SendEvent,
  SendEventResponse,
  UpdateTerminal,
} from './interface';

export class Terminal {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async sendEvent(
    terminalId: string,
    data: SendEvent,
  ): Promise<SendEventResponse | BadRequest> {
    return await this.http.post(
      `/terminal/${terminalId}/event`,
      JSON.stringify(data),
    );
  }

  async fetchEventStatus(
    terminalId: string,
    eventId: string,
  ): Promise<FetchEventStatusResponse | BadRequest> {
    return await this.http.get(
      `/terminal/${terminalId}/event/${eventId}`,
    );
  }

  async fetchStatus(
    terminalId: string,
  ): Promise<FetchTerminalStatusResponse | BadRequest> {
    return await this.http.get(`/terminal/${terminalId}/presence`);
  }

  async list(
    queryParams?: ListTerminalsQueryParams,
  ): Promise<ListTerminalsResponse | BadRequest> {
    return await this.http.get('/terminal', {
      params: { ...queryParams },
    });
  }

  async fetch(
    terminalId: string,
  ): Promise<FetchTerminalResponse | BadRequest> {
    return await this.http.get(`/terminal/${terminalId}`);
  }

  async update(
    terminalId: string,
    data: UpdateTerminal,
  ): Promise<Response | BadRequest> {
    return await this.http.put(
      `/terminal/${terminalId}`,
      JSON.stringify(data),
    );
  }

  async commission(
    data: CommissionDevice,
  ): Promise<CommissionResponse | BadRequest> {
    return await this.http.post(
      '/terminal/commission_device',
      JSON.stringify(data),
    );
  }

  async decommission(
    data: DecommissionDevice,
  ): Promise<DecommissionResponse | BadRequest> {
    return await this.http.post(
      '/terminal/decommission_device',
      JSON.stringify(data),
    );
  }
}
