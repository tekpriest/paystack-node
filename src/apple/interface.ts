export interface Response {
  status: boolean;
  message: string;
}

export type DomainRegisterResponse = Response;
export type UnregisterDomainRegisterResponse = Response;

export interface ListDomainsResponse extends Response {
  data: {
    domainNames: string[];
  };
}
