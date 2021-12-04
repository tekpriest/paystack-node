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

export interface Submit {
  reference: string;
}
export interface SubmitPIN extends Submit {
  pin: string;
}
export interface SubmitOTP extends Submit {
  otp: string;
}

export interface SubmitPhone extends Submit {
  phone: string;
}

export interface SubmitBirthday extends Submit {
  birthday: Date;
}

export interface SubmitAddress extends Submit {
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

enum Channel {
  card = 'card',
}

export interface ChargeCreated {
  status: boolean;
  message: string;
  data:
    | ChargeCreatedOk
    | ChargeCreatedResponseWithAddress
    | ChargeCreatedResponseWithPending
    | ChargeCreatedResponseWithBankAuth
    | ChargeCreatedResponseWithMobileMoney
    | ChargeCreatedResponseWithUSSD
    | ChargeCreatedResponseWithOTP
    | ChargeCreatedResponseWithPin
    | ChargeCreatedResponseWithPhone
    | ChargeFailed;
}

interface ChargeCreatedOk {
  amount: number;
  currency: string;
  transaction_date: string;
  status: string;
  reference: string;
  domain: string;
  metadata: Record<string, unknown>;
  gateway_response: string;
  message: string;
  channel: Channel;
  ip_address: string;
  log: any | null;
  fees: number;
  authorization: Authorization;
  customer: Customer;
  display_text: string;
  plan: string | null;
}

interface ChargeCreatedResponseWithPending {
  reference: string;
  status: string;
}

interface ChargeCreatedResponseWithAddress {
  display_text: string;
  reference: string;
  status: string;
  country_code: string;
}

interface ChargeCreatedResponseWithMobileMoney {
  amount: number;
  channel: Channel;
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
}

interface ChargeCreatedResponseWithUSSD {
  reference: string;
  status: string;
  display_text: string;
  ussd_code: string;
}

interface ChargeCreatedResponseWithBirthday {
  reference: string;
  status: string;
  display_text: string;
}

interface ChargeCreatedResponseWithPhone
  extends ChargeCreatedResponseWithBirthday {}

interface ChargeCreatedResponseWithBankAuth {
  refernce: string;
  uri: string;
  status: string;
}

interface ChargeCreatedResponseWithPin
  extends ChargeCreatedResponseWithPending {}

interface ChargeCreatedResponseWithOTP
  extends ChargeCreatedResponseWithPending {
  display_text: string;
}

interface ChargeFailed {
  refernce: string;
  message: string;
  status: string;
}

interface Authorization {
  authorization_code: string;
  bank: string;
  bin: string;
  brand: string;
  channel: Channel;
  country_code: string;
  exp_month: string;
  exp_year: string;
  last4: string;
  reusable: boolean;
  signature: string;
  account_name: string;
}

interface Customer {
  customer_code: string;
  email: string;
  id: number;
  risk_action: string;
  first_name?: string;
  last_name?: string;
  phone?: string | null;
  metadata?: Record<string, unknown> | null;
}
