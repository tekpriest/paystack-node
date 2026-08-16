import { HttpClient } from '../http';
import { BadRequest, Response } from '../interface';
import {
  AddSplitCode,
  AddSplitCodeResponse,
  AssignDestination,
  AssignDestinationResponse,
  CreateVirtualTerminal,
  CreateVirtualTerminalResponse,
  FetchVirtualTerminalResponse,
  ListVirtualTerminalsQueryParams,
  ListVirtualTerminalsResponse,
  RemoveSplitCode,
  UnassignDestination,
  UpdateVirtualTerminal,
} from './interface';

export class VirtualTerminal {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async create(
    data: CreateVirtualTerminal,
  ): Promise<CreateVirtualTerminalResponse | BadRequest> {
    return await this.http.post('/virtual_terminal', JSON.stringify(data));
  }

  async list(
    queryParams?: ListVirtualTerminalsQueryParams,
  ): Promise<ListVirtualTerminalsResponse | BadRequest> {
    return await this.http.get('/virtual_terminal', {
      params: { ...queryParams },
    });
  }

  async fetch(
    code: string,
  ): Promise<FetchVirtualTerminalResponse | BadRequest> {
    return await this.http.get(`/virtual_terminal/${code}`);
  }

  async update(
    code: string,
    data: UpdateVirtualTerminal,
  ): Promise<Response | BadRequest> {
    return await this.http.put(
      `/virtual_terminal/${code}`,
      JSON.stringify(data),
    );
  }

  async deactivate(code: string): Promise<Response | BadRequest> {
    return await this.http.put(`/virtual_terminal/${code}/deactivate`);
  }

  async assignDestination(
    code: string,
    data: AssignDestination,
  ): Promise<AssignDestinationResponse | BadRequest> {
    return await this.http.post(
      `/virtual_terminal/${code}/destination/assign`,
      JSON.stringify(data),
    );
  }

  async unassignDestination(
    code: string,
    data: UnassignDestination,
  ): Promise<Response | BadRequest> {
    return await this.http.post(
      `/virtual_terminal/${code}/destination/unassign`,
      JSON.stringify(data),
    );
  }

  async addSplitCode(
    code: string,
    data: AddSplitCode,
  ): Promise<AddSplitCodeResponse | BadRequest> {
    return await this.http.put(
      `/virtual_terminal/${code}/split_code`,
      JSON.stringify(data),
    );
  }

  async removeSplitCode(
    code: string,
    data: RemoveSplitCode,
  ): Promise<Response | BadRequest> {
    return await this.http.delete(`/virtual_terminal/${code}/split_code`, {
      data: JSON.stringify(data),
    });
  }
}
