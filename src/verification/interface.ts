import { Response } from '../interface';

export interface ResolveAccount {
  /**
   * Account Number
   */
  account_number: string;

  /**
   * You can get the list of bank codes
   * by calling the List Banks endpoint
   */
  bank_code: string;
}

export type AccountType = 'personal' | 'business';

export type DocumentType =
  | 'identityNumber'
  | 'passportNumber'
  | 'businessRegistrationNumber';

export interface AccountResolved extends Response {
  data: {
    /**
     * Verified Account Number
     */
    account_number: string;

    /**
     * Verified Account Name
     */
    account_name: string;
  };
}

export interface ValidateAccount {
  /**
   * The bank code of the customer’s bank.
   * You can fetch the bank codes
   * by using our List Banks endpoint
   */
  bank_code: string;

  /**
   * The two digit ISO code of the customer’s bank
   */
  country_code: string;

  /**
   * Customer’s account number
   */
  account_number: string;

  /**
   * Customer's first and last name registered with their bank
   */
  account_name: string;

  /**
   * This can take one of: [ personal, business ]
   */
  account_type: AccountType;

  /**
   * Customer’s mode of identity.
   * This could be one of:
   * [ identityNumber, passportNumber, businessRegistrationNumber ]
   */
  document_type: DocumentType;

  /**
   * Customer’s mode of identity number
   */
  document_number: string;
}

export interface AccountVerifiedResponse extends Response {
  data: {
    /**
     * Verification Status
     */
    verified: boolean;

    /**
     * Verification Message
     */
    verificationMessage: string;
  };
}

export interface BinResolvedResponse extends Response {
  data: {
    bin: string;
    brand: string;
    sub_brand: string;
    country_code: string;
    country_name: string;
    card_type: string;
    bank: string;
    linked_bank_id: number;
  };
}
