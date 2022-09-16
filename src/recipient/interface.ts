import { Meta, Response } from '../interface';

export interface CreateRecipient {
  /**
   * Recipient Type.
   * It could be one of: `nuban`, `mobile_money` or `basa`
   */
  type: string;
  /** A name for the recipient */
  name: string;
  /** Required if type is `nuban` or `basa` */
  account_number: string;
  /**
   * Required if type is nuban or basa.
   * You can get the list of Bank Codes by calling the List Banks endpoint.
   */
  bank_code: string;
  /** A description for this recipient */
  description?: string;
  /** Currency for the account receiving the transfer */
  currency?: string;
  /** An authorization code from a previous transaction */
  authorization_code?: string;
  /**
   * Store additional information about your
   * recipient in a structured format, JSON
   */
  metadata?: Record<string, unknown>;
}

export interface UpdateRecipient {
  name: string;
  email?: string;
}

export interface Recipient {
  id: number;
  active: boolean;
  createdAt: Date;
  currency: string;
  description?: string;
  domain: string;
  email?: string;
  integration: number;
  metadata?: Record<string, unknown>;
  name: string;
  recipient_code: string;
  type: string;
  updatedAt: Date;
  is_deleted: boolean;
  isDeleted: boolean;
  details: RecipientDetails;
}

export interface RecipientDetails {
  authorization_code?: string;
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

export interface ViewRecipientResponse extends Response {
  data: Recipient;
}

export interface RecipientCreatedResponse extends Response {
  data: Recipient;
}

export interface BulkRecipientsCreatedResponse extends Response {
  data: {
    success: Recipient[];
    errors: Record<string, unknown>[];
  };
}

export interface ListRecipientResponse extends Response {
  data: Recipient[];
  meta: Meta;
}
