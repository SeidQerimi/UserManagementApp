export interface Address {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: {
    lat?: string;
    lng?: string;
  };
}

export interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

export interface User {
  id: number | string;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  website?: string;
  address?: Address;
  company?: Company;
  source?: 'api' | 'local';
}

export type SortField = 'name' | 'company';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}
