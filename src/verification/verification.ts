import { Axios } from 'axios';
import {
  ResolveAccount,
  AccountResolved,
  ValidateAccount,
  AccountVerified,
  BinResolved,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
  data: null;
}

/**
 * # Verification
 * The Verification API allows you perform KYC processes.
 */
export class Verification {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  /**
   * # Resolve Account
   * Confirm an account belongs to the right customer
   * @param {ResolveAccount} data **Query Param**
   */
  async resolveAccount(
    data: ResolveAccount,
  ): Promise<AccountResolved | BadRequest> {
    return await this.http.get('/bank/resolve', { params: { ...data } });
  }

  /**
   * # Validate Account
   * Confirm the authenticity of a customer's account number
   * before sending money
   * @param {ValidateAccount} data **Data Param**
   */
  async validateAccount(
    data: ValidateAccount,
  ): Promise<AccountVerified | BadRequest> {
    return await this.http.post('/bank/validate', JSON.stringify(data));
  }

  /**
   * # Resolve Card BIN
   * Get more information about a customer's card
   * using the first 6 characters of the card
   * @param {string} bin **Path Param**
   */
  async resolveCard(bin: number): Promise<BinResolved | BadRequest> {
    return await this.http.get(`/decision/bin/${bin}`);
  }
}
