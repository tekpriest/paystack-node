import { Customer } from '../customer/interface';
import { Response } from '../interface';
import { Transaction } from '../transaction/interface';

export interface Charge {
  amount: number;
  currency: string;
  transaction_date: string;
  status: string;
  reference: string;
  domain: string;
  metadata?: Record<string, unknown>;
  gateway_response: string;
  message: string;
  channel: string;
  ip_address: string;
  log?: unknown;
  fees: number;
  authorization: Authorization;
  customer: Customer;
  transaction?: Transaction;
  display_text: string;
  plan: unknown;
  fees_split?: string;
  paid_at: Date;
}

// export type ChargeCreatedResponse =
//   | ChargeCreated
//   | ChargeCreatedWithOTP
//   | ChargeCreatedWithPending
//   | ChargeCreatedWithAddress
//   | ChargeCreatedWithBankAuth
//   | ChargeCreatedWithPin
//   | ChargeCreatedWithPhone
//   | ChargeCreatedWithBirthday
//   | ChargeCreatedWithUSSD
//   | ChargeCreatedWithMobileMoney
//   | ChargeFailed;

export interface CreateCharge {
  email: string;
  amount: string;
  bank?: {
    code: string;
    account_number: string;
  };
  authorization_code?: string;
  pin?: string;
  metadata?: Record<string, unknown>;
  reference?: string;
  ussd?: string;
  mobile_money?: string;
  device_id?: string;
  birthday?: string;
}
export interface SubmitPIN {
  reference: string;
  pin: string;
}
export interface SubmitOTP {
  reference: string;
  otp: string;
}

export interface SubmitPhone {
  reference: string;
  phone: string;
}

export interface SubmitBirthday {
  reference: string;
  birthday: Date;
}

export interface SubmitAddress {
  reference: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface ChargeCreatedResponse extends Response {
  data: Charge;
}

export interface ChargeCreatedWithPendingResponse extends Response {
  data: {
    reference: string;
    status: string;
  };
}

export interface ChargeCreatedWithAddressResponse extends Response {
  data: {
    display_text: string;
    reference: string;
    status: string;
    country_code: string;
  };
}

export interface ChargeCreatedWithMobileMoneyResponse extends Response {
  data: Charge;
}

export interface ChargeCreatedWithUSSDResponse extends Response {
  data: {
    reference: string;
    status: string;
    display_text: string;
    ussd_code: string;
  };
}

export interface ChargeCreatedWithBirthdayResponse extends Response {
  data: {
    reference: string;
    status: string;
    display_text: string;
  };
}

export interface ChargeCreatedWithBankAuthResponse extends Response {
  data: {
    refernce: string;
    uri: string;
    status: string;
  };
}

export interface ChargeCreatedWithOTPResponse extends Response {
  data: {
    refernce: string;
    status: string;
    display_text: string;
  };
}

export interface ChargeCreatedWithPinResponse extends Response {
  data: {
    refernce: string;
    status: string;
  };
}

export interface ChargeCreatedWithPhoneResponse extends Response {
  data: {
    refernce: string;
    status: string;
    display_text: string;
  };
}
export interface ChargeFailedResponse extends Response {
  data: {
    refernce: string;
    message: string;
    status: string;
  };
}

export interface Authorization {
  authorization_code: string;
  card_type: string;
  bank: string;
  bin: string;
  brand: string;
  channel: string;
  country_code: string;
  exp_month: string;
  exp_year: string;
  last4: string;
  reusable: boolean;
  signature: string;
  account_name: string;
}
