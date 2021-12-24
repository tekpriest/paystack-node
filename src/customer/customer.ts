import { Axios } from 'axios';
import { Meta } from '../transaction';
import {
  CreateCustomer,
  CustomerCreated,
  CustomerData,
  ListCustomerQueryParams,
  ListCustomers,
  Response,
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
    const response = await this.http.post('/customer', JSON.stringify(data));
    return JSON.parse(response.data);
  }

  /**
   * ## List Customers
   * List customers available on your integration
   * @param {ListCustomerQueryParams} queryParams
   */
  async list(
    queryParams?: ListCustomerQueryParams,
  ): Promise<(Response & ListCustomers[] & Meta) | BadRequest> {
    const response = await this.http.get('/customer', {
      params: { ...queryParams },
    });
    return JSON.parse(response.data);
  }

  /**
   * ## Fetch Customer
   * Get details of a customer on your integration
   * @param {String} email_or_code
   */
  async fetch(emailCode: string): Promise<CustomerData | BadRequest> {
    const response = await this.http.get(`/customer/${emailCode}`);
    return JSON.parse(response.data);
  }

  /**
   * ## Update CUstomer
   * Update a customer's details on your integration
   */
  async update(
    code: string,
    data: UpdateCustomer,
  ): Promise<CustomerData | BadRequest> {
    const response = await this.http.put(
      `/customer/${code}`,
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
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
    const response = await this.http.post(
      `/customer/${customerCode}/identification`,
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }

  /**
   * ## Whitelist/Blacklist Customer
   * Whitelist or black a customer on your integration
   * @param {SetRiskAction} data
   */
  async setRiskAction(data: SetRiskAction): Promise<CustomerData | BadRequest> {
    const response = await this.http.post(
      '/customer/set_risk_action',
      JSON.stringify(data),
    );
    return JSON.parse(response.data);
  }

  /**
   * ## Deactivate Authorization
   * Deactivate an authorization when the card needs to be forgotten
   * @param {String} authorizaion_code
   */
   // @ts-ignore: variable-name
  async deactivateAutorization(authorizaion_code: string): Promise<Response> {
    const response = await this.http.post(
      '/customer/deactivate_authorization',
      JSON.stringify({ authorizaion_code }),
    );
    return JSON.parse(response.data);
  }
}
