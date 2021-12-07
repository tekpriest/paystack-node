import { Axios } from 'axios';
import { Charge, ICharge } from './charge';
import { IPlan, Plan } from './plan/plan';
import { ITransaction, Transaction } from './transaction/transaction';

/**
 * Paystack SDK
 * @author Asaju Enitan <@en1tan>
 */

export default class Paystack {
  private readonly http: Axios;
  public charge: ICharge;
  public transaction: ITransaction;
  public plan: Plan;
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
    this.plan = new Plan(this.http);
  }
}
