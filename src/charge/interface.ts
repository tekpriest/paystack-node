import { Response } from '../transaction';

export type ChargeCreatedResponse =
  | ChargeCreated
  | ChargeCreatedWithOTP
  | ChargeCreatedWithPending
  | ChargeCreatedWithAddress
  | ChargeCreatedWithBankAuth
  | ChargeCreatedWithPin
  | ChargeCreatedWithPhone
  | ChargeCreatedWithBirthday
  | ChargeCreatedWithUSSD
  | ChargeCreatedWithMobileMoney
  | ChargeFailed;

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

export interface ChargeCreated extends Response {
  data: {
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    domain: string;
    metadata: Record<string, unknown>;
    gateway_response: string;
    message: string;
    channel: string;
    ip_address: string;
    log: unknown;
    fees: number;
    authorization: Authorization;
    customer: Customer;
    display_text: string;
    plan: unknown;
  };
}

interface ChargeCreatedWithPending extends Response {
  data: {
    reference: string;
    status: string;
  };
}

interface ChargeCreatedWithAddress extends Response {
  data: {
    display_text: string;
    reference: string;
    status: string;
    country_code: string;
  };
}

interface ChargeCreatedWithMobileMoney extends Response {
  data: {
    amount: number;
    channel: string;
    created_at: Date;
    currency: string;
    domain: string;
    fees: number;
    gateway_response: string;
    id: number;
    ip_address: string;
    message: string;
    paid_at: Date;
    reference: string;
    status: string;
    transaction_date: Date;
    authorization: Authorization;
    customer: Customer;
  };
}

interface ChargeCreatedWithUSSD extends Response {
  data: {
    reference: string;
    status: string;
    display_text: string;
    ussd_code: string;
  };
}

interface ChargeCreatedWithBirthday extends Response {
  data: {
    reference: string;
    status: string;
    display_text: string;
  };
}

interface ChargeCreatedWithBankAuth extends Response {
  data: {
    refernce: string;
    uri: string;
    status: string;
  };
}

interface ChargeCreatedWithOTP extends Response {
  data: {
    refernce: string;
    status: string;
    display_text: string;
  };
}

interface ChargeCreatedWithPin extends Response {
  data: {
    refernce: string;
    status: string;
  };
}

interface ChargeCreatedWithPhone extends Response {
  data: {
    refernce: string;
    status: string;
    display_text: string;
  };
}
interface ChargeFailed extends Response {
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

export interface Customer {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  customer_code: string;
  risk_action: string;
  phone?: string | null;
  metadata?: Record<string, unknown> | null;
  international_format_phone?: string | null;
}
