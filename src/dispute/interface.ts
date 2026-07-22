import { Meta, Response } from '../interface';

export interface ListDisputesQueryParams {
  perPage?: number;
  page?: number;
  from?: Date;
  to?: Date;
  transaction?: string;
  status?: 'awaiting-merchant-feedback' | 'awaiting-bank-feedback' | 'pending' | 'resolved';
}

export interface UpdateDispute {
  refund_amount: number;
  uploaded_filename?: string;
}

export interface AddEvidence {
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  service_details: string;
  delivery_address?: string;
  delivery_date?: Date;
}

export interface ResolveDispute {
  resolution: 'merchant-accepted' | 'declined';
  message: string;
  refund_amount: number;
  uploaded_filename?: string;
  evidence?: number;
}

export interface DisputeHistory {
  status: string;
  by: string;
  createdAt: string;
}

export interface DisputeMessage {
  sender: string;
  body: string;
  createdAt: string;
}

export interface Dispute {
  id: number;
  refund_amount: number | null;
  currency: string | null;
  status: string;
  resolution: string | null;
  domain: string;
  transaction: Record<string, unknown>;
  transaction_reference: string | null;
  category: string | null;
  customer: Record<string, unknown>;
  bin: string | null;
  last4: string | null;
  dueAt: string | null;
  resolvedAt: string | null;
  evidence: Record<string, unknown> | null;
  attachments: string;
  note: string | null;
  history: DisputeHistory[];
  messages: DisputeMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface DisputeCreatedEvidence {
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  service_details: string;
  delivery_address?: string;
  dispute: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListDisputesResponse extends Response {
  data: Dispute[];
  meta: Meta;
}

export interface FetchDisputeResponse extends Response {
  data: Dispute;
}

export interface UpdateDisputeResponse extends Response {
  data: Dispute[];
}

export interface AddEvidenceResponse extends Response {
  data: DisputeCreatedEvidence;
}

export interface UploadUrlResponse extends Response {
  data: {
    signedUrl: string;
    fileName: string;
  };
}

export interface ExportDisputesResponse extends Response {
  data: {
    path: string;
  };
}
