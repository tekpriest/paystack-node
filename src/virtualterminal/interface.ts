import { Response } from '../interface';

export interface CreateVirtualTerminal {
  name: string;
  destinations?: { target: string; name: string }[];
  metadata?: Record<string, unknown>;
  currency?: string;
  custom_fields?: { display_name: string; variable_name: string }[];
}

export interface UpdateVirtualTerminal {
  name: string;
}

export interface AssignDestination {
  destinations: { target: string; name: string }[];
}

export interface UnassignDestination {
  targets: string[];
}

export interface AddSplitCode {
  split_code: string;
}

export interface RemoveSplitCode {
  split_code: string;
}

export interface VirtualTerminalDestination {
  target: string;
  type: string;
  name: string;
  created_at?: string;
}

export interface VirtualTerminal {
  id: number;
  code: string;
  name: string;
  integration: number;
  domain: string;
  paymentMethods: unknown[];
  active: boolean;
  created_at?: string;
  connect_account_id?: number | null;
  destinations?: VirtualTerminalDestination[];
  currency: string;
  metadata?: Record<string, unknown> | null;
}

export interface ListVirtualTerminalsQueryParams {
  status?: 'active' | 'inactive';
  perPage?: number;
  search?: string;
  next?: string;
  previous?: string;
}

export interface CreateVirtualTerminalResponse extends Response {
  data: VirtualTerminal;
}

export interface ListVirtualTerminalsResponse extends Response {
  data: VirtualTerminal[];
  meta: {
    next: string | null;
    previous: string | null;
    perPage: number;
  };
}

export interface FetchVirtualTerminalResponse extends Response {
  data: VirtualTerminal;
}

export interface AssignDestinationResponse extends Response {
  data: VirtualTerminalDestination[];
}

export interface AddSplitCodeResponse extends Response {
  data: Record<string, unknown>;
}
