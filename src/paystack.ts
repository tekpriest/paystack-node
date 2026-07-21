import { AxiosInstance, AxiosResponse } from 'axios';
import { ApplePay } from './apple/apple';
import { Charge } from './charge/charge';
import { Customer } from './customer/customer';
import { DedicatedAccount } from './dedicated/dedicated';
import { DirectDebit } from './directdebit/directdebit';
import { Dispute } from './dispute/dispute';
import { Integration } from './integration/integration';
import { Invoice } from './invoice/invoice';
import { PaymentPage } from './payment/payment';
import { PaymentRequest } from './paymentrequest/paymentrequest';
import { Plan } from './plan';
import { Product } from './product/product';
import { Recipient } from './recipient/recipient';
import { Settlement } from './settlement/settlement';
import { TransactionSplit } from './split/split';
import { SubAccount } from './subaccounts/subaccount';
import { Subscription } from './subscription/subscription';
import { Terminal } from './terminal/terminal';
import { Transaction } from './transaction/transaction';
import { Transfer } from './transfer/transfer';
import { BulkCharge } from './bulkcharge/bulkcharge';
import { Verification } from './verification/verification';
import { VirtualTerminal } from './virtualterminal/virtualterminal';
import { Refund } from './refund/refund';
import { Misc } from './misc/misc';
import axios from 'axios';

/**
 * Paystack SDK
 * @author Asaju Enitan <@tPriest>
 */

export class Paystack {
  private readonly http: AxiosInstance;
  public bulkcharge: BulkCharge;
  public charge: Charge;
  public customer: Customer;
  public dedicated: DedicatedAccount;
  public directDebit: DirectDebit;
  public dispute: Dispute;
  public integration: Integration;
  public plan: Plan;
  public product: Product;
  public subscription: Subscription;
  public terminal: Terminal;
  public transaction: Transaction;
  public transfer: Transfer;
  public split: TransactionSplit;
  public applePay: ApplePay;
  public subAccount: SubAccount;
  public page: PaymentPage;
  public invoice: Invoice;
  public paymentRequest: PaymentRequest;
  public settlement: Settlement;
  public recipient: Recipient;
  public refund: Refund;
  public verification: Verification;
  public virtualTerminal: VirtualTerminal;
  public misc: Misc;
  constructor(private readonly key: string) {
    this.http = axios.create({
      baseURL: 'https://api.paystack.co',
      headers: {
        Authorization: `Bearer ${this.key}`,
        'Content-Type': 'application/json',
      },
    });
    this.http.interceptors.response.use(
      (response: AxiosResponse) => response.data,
    );

    this.bulkcharge = new BulkCharge(this.http);
    this.charge = new Charge(this.http);
    this.customer = new Customer(this.http);
    this.dedicated = new DedicatedAccount(this.http);
    this.directDebit = new DirectDebit(this.http);
    this.dispute = new Dispute(this.http);
    this.integration = new Integration(this.http);
    this.plan = new Plan(this.http);
    this.product = new Product(this.http);
    this.split = new TransactionSplit(this.http);
    this.subscription = new Subscription(this.http);
    this.terminal = new Terminal(this.http);
    this.transaction = new Transaction(this.http);
    this.transfer = new Transfer(this.http);
    this.applePay = new ApplePay(this.http);
    this.subAccount = new SubAccount(this.http);
    this.page = new PaymentPage(this.http);
    this.invoice = new Invoice(this.http);
    this.paymentRequest = new PaymentRequest(this.http);
    this.settlement = new Settlement(this.http);
    this.recipient = new Recipient(this.http);
    this.refund = new Refund(this.http);
    this.verification = new Verification(this.http);
    this.virtualTerminal = new VirtualTerminal(this.http);
    this.misc = new Misc(this.http);
  }
}

export default Paystack;
