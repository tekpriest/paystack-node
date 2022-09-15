import { Meta } from '../interface';

export type SplitCurrrencyType = 'GHS' | 'NGN' | 'ZAR' | 'USD';
export type SplitType = 'percentage' | 'flat';

interface SubAccount {
  id: number;
  subaccount_code: string;
  business_name: string;
  description: string;
  primary_contact_name?: string;
  primary_contact_email?: string;
  primary_contact_phone?: string;
  metadata?: Record<string, unknown>;
  percentage_charge?: number;
  settlement_bank?: string;
  account_number?: string;
}

export interface SplitSubAccount {
  /**
   * This is the sub account code
   */
  subaccount: string;
  share: number;
}

export interface CreateSplit {
  /**
   * Name of the transaction split
   */
  name: string;
  /**
   * The type of transaction split you want to create.
   * You can use one of the following: percentage | flat
   */
  type: SplitType;
  /**
   * Any of NGN, GHS, ZAR, or USD
   */
  currency: SplitCurrrencyType;
  /**
   * A list of object containing subaccount code
   * and number of shares: [{subaccount: ‘ACT_xxxxxxxxxx’, share: xxx},{...}]
   */
  subaccounts: SplitSubAccount[];
  /**
   * Any of subaccount | account | all-proportional | all
   */
  bearer_type: string;
  /**
   * Subaccount code
   */
  bearer_subaccount: string;
}

export interface ListSplitQueryParams {
  /**
   * The name of the split
   */
  name?: string;
  /**
   * Any of true or false
   */
  active?: boolean;
  /**
   * Sort by name, defaults to createdAt dat
   */
  sort_by?: string;
  /**
   * Number of splits per page. If not specify we use a default value of 50.
   */
  perPage?: number;
  /**
   * Page number to view. If not specify we use a default value of 1.
   * @default 1
   */
  page?: number;
  /**
   * A timestamp from which to start listing splits e.g. 2019-09-24T00:00:05.000Z, 2019-09-21
   */
  from?: Date;
  /**
   * A timestamp at which to stop listing splits e.g. 2019-09-24T00:00:05.000Z, 2019-09-21
   */
  to?: Date;
}

interface TransactionSplit {
  id: number;
  name: string;
  type: string;
  currency: SplitCurrrencyType;
  integration: number;
  domain: string;
  split_code: string;
  active: boolean;
  bearer_type: string;
  bearer_subaccount: number;
  createdAt: Date;
  updatedAt: Date;
  subaccounts: {
    subaccount: SubAccount;
    share: number;
  }[];
  total_subaccounts?: number;
}

export interface UpdateTransactionSplit {
  name: string;
  active: boolean;
  bearer_type?: string;
  bearer_subaccount?: string;
}

// Responses
export interface Response {
  status: boolean;
  message: string;
}

export interface SplitCreatedResponse extends Response {
  data: TransactionSplit;
}

export interface ListSplitsResponse extends Response {
  data: TransactionSplit[];
  meta: Meta;
}

export interface TransactionSplitResponse extends Response {
  data: TransactionSplit;
}

export interface UpdateTransactionSplitResponse extends Response {
  data: TransactionSplit;
}
