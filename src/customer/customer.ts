import { Axios } from 'axios';
import { ListCustomersResponse } from '.';
import {
  CreateCustomer,
  CustomerCreated,
  CustomerData,
  ListCustomerQueryParams,
  SetRiskAction,
  UpdateCustomer,
  ValidateCustomer,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
  data: null;
}

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
    return await this.http.post<CustomerCreated | BadRequest, any>(
      '/customer',
      JSON.stringify(data),
    );
  }

  /**
   * ## List Customers
   * List customers available on your integration
   * @param {ListCustomerQueryParams} queryParams
   */
  async list(
    queryParams?: ListCustomerQueryParams,
  ): Promise<ListCustomersResponse | BadRequest> {
    return await this.http.get<ListCustomersResponse | BadRequest, any>(
      '/customer',
      {
        params: { ...queryParams },
      },
    );
  }

  /**
   * ## Fetch Customer
   * Get details of a customer on your integration
   * @param {String} email_or_code
   */
  async fetch(emailCode: string): Promise<CustomerData | BadRequest> {
    return await this.http.get<CustomerData | BadRequest, any>(
      `/customer/${emailCode}`,
    );
  }

  /**
   * ## Update CUstomer
   * Update a customer's details on your integration
   */
  async update(
    code: string,
    data: UpdateCustomer,
  ): Promise<CustomerData | BadRequest> {
    return await this.http.put<CustomerData | BadRequest, any>(
      `/customer/${code}`,
      JSON.stringify(data),
    );
  }

  /**
   * ## Validate Customer
   * Validate a customer's identity
   * @param {String} customer_code
   * @param {ValidateCustomer} data
   */
  async validate(
    customerCode: string,
    data: ValidateCustomer,
  ): Promise<Response | BadRequest> {
    return await this.http.post<Response | BadRequest, any>(
      `/customer/${customerCode}/identification`,
      JSON.stringify(data),
    );
  }

  /**
   * ## Whitelist/Blacklist Customer
   * Whitelist or black a customer on your integration
   * @param {SetRiskAction} data
   */
  async setRiskAction(data: SetRiskAction): Promise<CustomerData | BadRequest> {
    return await this.http.post<CustomerData | BadRequest, any>(
      '/customer/set_risk_action',
      JSON.stringify(data),
    );
  }

  /**
   * ## Deactivate Authorization
   * Deactivate an authorization when the card needs to be forgotten
   * @param {String} authorizaion_code
   */
  async deactivateAutorization(authorizationCode: string): Promise<Response> {
    const response = await this.http.post<Response, any>(
      '/customer/deactivate_authorization',
      JSON.stringify({ authorizaion_code: authorizationCode }),
    );
    return response;
  }
}
