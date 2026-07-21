import { Response } from '../interface';

export interface TerminalEventData {
  id?: number;
  reference?: number;
}

export interface SendEvent {
  type: 'invoice' | 'transaction';
  action: 'process' | 'view' | 'print';
  data: TerminalEventData;
}

export interface Terminal {
  id: number;
  serial_number: string;
  device_make: string | null;
  terminal_id: string;
  integration: number;
  domain: string;
  name: string;
  address: string | null;
  status: string;
}

export interface UpdateTerminal {
  name?: string;
  address?: string;
}

export interface CommissionDevice {
  serial_number: string;
}

export interface DecommissionDevice {
  serial_number: string;
}

export interface ListTerminalsQueryParams {
  perPage?: number;
  next?: string;
  previous?: string;
}

export interface SendEventResponse extends Response {
  data: {
    id: string;
  };
}

export interface FetchEventStatusResponse extends Response {
  data: {
    delivered: boolean;
  };
}

export interface FetchTerminalStatusResponse extends Response {
  data: {
    online: boolean;
    available: boolean;
  };
}

export interface ListTerminalsResponse extends Response {
  data: Terminal[];
  meta: {
    next: string | null;
    previous: string | null;
    perPage: number;
  };
}

export interface FetchTerminalResponse extends Response {
  data: Terminal;
}

export interface CommissionResponse extends Response {
  data?: Record<string, unknown>;
}

export interface DecommissionResponse extends Response {
  data?: Record<string, unknown>;
}
