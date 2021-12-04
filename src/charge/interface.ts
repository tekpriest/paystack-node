export interface CreateCharge {
  email: string;
  amount: string;
  bank?: Record<string, unknown>;
  authorization_code?: string;
  pin?: string;
  metadata?: Record<string, unknown>;
  reference?: string;
  ussd?: string;
  mobile_money?: string;
  device_id?: string;
}

enum Status {
  success,
  pay_offline,
  send_birthday,
  open_uri,
  failed,
  send_pin,
}

enum Channel {
  card,
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
  status: Status;
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
  status: Status;
  transaction_date: Date;
  authorization: Authorization;
  customer: Customer;
}

interface ChargeCreatedResponseWithUSSD {
  reference: string;
  status: Status;
  display_text: string;
  ussd_code: string;
}

interface ChargeCreatedResponseWithBirthday {
  reference: string;
  status: Status;
  display_text: string;
}

interface ChargeCreatedResponseWithPhone
  extends ChargeCreatedResponseWithBirthday {}

interface ChargeCreatedResponseWithBankAuth {
  refernce: string;
  uri: string;
  status: Status;
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
  status: Status;
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
