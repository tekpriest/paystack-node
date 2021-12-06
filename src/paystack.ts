import { Axios } from 'axios';
import { Charge, ICharge } from './charge/charge';
import { ITransaction, Transaction } from './transaction/transaction';

/**
 * Paystack SDK
 * @author Asaju Enitan <@en1tan>
 */

export default class Paystack {
  private http: Axios;
  public charge: ICharge;
  public transaction: ITransaction;
  constructor(public readonly key: string) {
    this.http = new Axios({
      baseURL: 'https://api.paystack.co',
      headers: {
        Authorization: `Bearer ${this.key}`,
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });

    this.charge = new Charge(this.http);
    this.transaction = new Transaction(this.http);
  }
}
