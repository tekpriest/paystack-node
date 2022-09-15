import { Axios } from 'axios';
import { BadRequest } from '../interface';
import { ListCustomersResponse } from './interface';
import {
  CreateCustomer,
  CustomerCreated,
  FetchCustomerResponse,
  ListCustomerQueryParams,
  SetRiskAction,
  UpdateCustomer,
  ValidateCustomer,
} from './interface';

/**
 * # Customers
 * The Customers API allows you create and manage
 * customers on your integration
 */
export class Customer {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  /**
   * ## Create Customer
   * Create a customer on your integration
   * @param {CreateCustomer} data
   */
  async create(data: CreateCustomer): Promise<CustomerCreated | BadRequest> {
    return await this.http.post('/customer', JSON.stringify(data));
  }

  /**
   * ## List Customers
   * List customers available on your integration
   */
  async list(
    queryParams?: ListCustomerQueryParams,
  ): Promise<ListCustomersResponse | BadRequest> {
    return await this.http.get('/customer', {
      params: { ...queryParams },
    });
  }

  /**
   * ## Fetch Customer
   * Get details of a customer on your integration
   * @param {String} email_or_code
   */
  async fetch(emailCode: string): Promise<FetchCustomerResponse | BadRequest> {
    return await this.http.get(`/customer/${emailCode}`);
  }

  /**
   * ## Update CUstomer
   * Update a customer's details on your integration
   */
  async update(
    code: string,
    data: UpdateCustomer,
  ): Promise<FetchCustomerResponse | BadRequest> {
    return await this.http.put(`/customer/${code}`, JSON.stringify(data));
  }

  /**
   * ## Validate Customer
   * Validate a customer's identity
   */
  async validate(
    customerCode: string,
    data: ValidateCustomer,
  ): Promise<Response | BadRequest> {
    return await this.http.post(
      `/customer/${customerCode}/identification`,
      JSON.stringify(data),
    );
  }

  /**
   * ## Whitelist/Blacklist Customer
   * Whitelist or black a customer on your integration
   */
  async setRiskAction(
    data: SetRiskAction,
  ): Promise<FetchCustomerResponse | BadRequest> {
    return await this.http.post(
      '/customer/set_risk_action',
      JSON.stringify(data),
    );
  }

  /**
   * ## Deactivate Authorization
   * Deactivate an authorization when the card needs to be forgotten
   */
  async deactivateAutorization(authorizationCode: string): Promise<Response> {
    return await this.http.post(
      '/customer/deactivate_authorization',
      JSON.stringify({ authorizaion_code: authorizationCode }),
    );
  }
}
