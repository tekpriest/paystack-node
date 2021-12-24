import { Axios } from 'axios';
import { Charge } from './charge';
import { Customer } from './customer/customer';
import { Plan } from './plan';
import { Transaction } from './transaction';

/**
 * Paystack SDK
 * @author Asaju Enitan <@en1tan>
 */

export class Paystack {
  private readonly http: Axios;
  public charge: Charge;
  public transaction: Transaction;
  public plan: Plan;
  public customer: Customer
  constructor(public readonly key: string) {
    this.http = new Axios({
      baseURL: 'https://api.paystack.co',
      headers: {
        Authorization: `Bearer ${this.key}`,
      },
    });

    this.charge = new Charge(this.http);
    this.transaction = new Transaction(this.http);
    this.plan = new Plan(this.http);
    this.customer = new Customer(this.http)
  }
}
