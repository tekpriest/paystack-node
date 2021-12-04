import { Axios } from 'axios';
import { ChargeCreated, CreateCharge } from '.';

interface BadRequest {
  status: boolean;
  message: string;
  data: null;
}

export interface ICharge {
  create(data: CreateCharge): Promise<ChargeCreated | BadRequest>;
}

export class Charge implements ICharge {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }
  async create(data: CreateCharge): Promise<ChargeCreated | BadRequest> {
    const response = await this.http.post<ChargeCreated | BadRequest>(
      '/charge',
      data,
    );
    return response.data;
  }
}
