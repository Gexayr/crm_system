import api from './api';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export type CreateCustomerRequest = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCustomerRequest = Partial<CreateCustomerRequest>;

export const customerService = {
  // GET http://localhost:5000/api/customers
  getAll: () => 
    api.get<Customer[]>('/customers'),

  // GET http://localhost:5000/api/customers/:id
  getById: (id: string) => 
    api.get<Customer>(`/customers/${id}`),

  // POST http://localhost:5000/api/customers
  create: (data: CreateCustomerRequest) => 
    api.post<Customer>('/customers', data),

  // PUT http://localhost:5000/api/customers/:id
  update: (id: string, data: UpdateCustomerRequest) => 
    api.put<Customer>(`/customers/${id}`, data),

  // DELETE http://localhost:5000/api/customers/:id
  delete: (id: string) => 
    api.delete(`/customers/${id}`),
}; 