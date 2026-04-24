export interface Lead {
  _id?: string;
  leadId?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  source: string;
  value: number;
  notes?: string;
  createdAt?: string;
}
