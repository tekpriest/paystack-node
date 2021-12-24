import { Axios } from 'axios';
import {
  CreatePlan,
  ListPlanQueryParams,
  PlanResponse,
  UpdatePlan,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
  data: null;
}

/**
 * ## Plans
 * The Plans API allows you create and manage installment
 * payment options on your integration
 * @class Plan
 */
export class Plan {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }
  /**
   * ### Create Plan
   * Create a plan on your integration
   * @param {CreatePlan} data Body Param
   * @returns {Promise<PlanResponse | BadRequest>}
   */
  async create(data: CreatePlan): Promise<PlanResponse | BadRequest> {
    const response = await this.http.post('/plan', JSON.stringify(data));
    return JSON.parse(response.data);
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
    const response = await this.http.get('/plan', {
      params: { ...queryParams },
    });
    return JSON.parse(response.data);
  }
  /**
   * ### Fetch Plan
   * Get details of a plan on your integration
   * @param id The plan `ID` or `code` you want to fetch
   * @returns {Promise<PlanResponse | BadRequest>}
   */
  async fetch(id: string): Promise<PlanResponse | BadRequest> {
    const response = await this.http.get(`/plan/${id}`);
    return JSON.parse(response.data);
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
    const response = await this.http.put(`/plan/${id}`, JSON.stringify(data));
    return JSON.parse(response.data);
  }
}
