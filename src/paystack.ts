import { Axios } from 'axios';
import { Charge } from './charge/charge';

/**
 * Paystack SDK
 * @author Asaju Enitan <@en1tan>
 */

export default class Paystack {
  private http: Axios;
  public charge: Charge;
  constructor(public readonly key: string) {
    this.http = new Axios({
      baseURL: 'https://api.paystack.co',
      headers: {
        Authorization: `Bearer ${this.key}`,
        'Content-Type': 'application/json',
      },
    });

    this.charge = new Charge(this.http);
  }
}
