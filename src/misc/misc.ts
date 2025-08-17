import { Axios } from "axios";
import { BadRequest } from "../interface";
import { BanksResponse, CountriesResponse, ListBanksQueryParams, StatesResponse } from "./interface";

export class Misc {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  async banks(query?: ListBanksQueryParams): Promise<BanksResponse | BadRequest> {
    return await this.http.get('/bank', { params: { ...query } })
  }

  async countries(): Promise<CountriesResponse | BadRequest> {
    return await this.http.get('/country')
  }

  async states(country?: string): Promise<StatesResponse | BadRequest> {
    const query: { country?: string } = country ? { country } : {}
    return await this.http.get('/address_verification/states', { params: query })
  }
}
