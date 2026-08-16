import { HttpClient } from '../http';
import { BadRequest } from '../interface';
import {
  CreatePlan,
  ListPlanQueryParams,
  PlanResponse,
  UpdatePlan,
} from './interface';

/**
 * ## Plans
 * The Plans API allows you create and manage installment
 * payment options on your integration
 * @class Plan
 */
export class Plan {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }
  /**
   * ### Create Plan
   * Create a plan on your integration
   * @param {CreatePlan} data Body Param
   * @returns {Promise<PlanResponse | BadRequest>}
   */
  async create(data: CreatePlan): Promise<PlanResponse | BadRequest> {
    return await this.http.post('/plan', JSON.stringify(data));
  }
  /**
   * ### List Plans
   * List plans available on your integration
   * @param queryParams Query Parameters
   * @returns {Promise<PlanResponse | BadRequest>}
   */
  async list(
    queryParams?: ListPlanQueryParams,
  ): Promise<PlanResponse | BadRequest> {
    return await this.http.get('/plan', {
      params: { ...queryParams },
    });
  }
  /**
   * ### Fetch Plan
   * Get details of a plan on your integration
   * @param id The plan `ID` or `code` you want to fetch
   * @returns {Promise<PlanResponse | BadRequest>}
   */
  async fetch(id: string): Promise<PlanResponse | BadRequest> {
    return await this.http.get(`/plan/${id}`);
  }
  /**
   * ### Update Plan
   * Update a plan details on your integration
   * @param id Plans's `ID` or `code`
   * @param {UpdatePlan} data Update Plan Data
   * @returns {Promise<PlanResponse | BadRequest>}
   */
  async update(
    id: string,
    data: UpdatePlan,
  ): Promise<PlanResponse | BadRequest> {
    return await this.http.put(`/plan/${id}`, JSON.stringify(data));
  }
}
