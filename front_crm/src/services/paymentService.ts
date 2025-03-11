import api from './api';

export interface Payment {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'bank_transfer' | 'cash' | 'other';
  date: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export type CreatePaymentRequest = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePaymentRequest = Partial<CreatePaymentRequest>;

export const paymentService = {
  // GET http://localhost:5000/api/payments
  getAll: () => 
    api.get<Payment[]>('/payments'),

  // GET http://localhost:5000/api/payments/:id
  getById: (id: string) => 
    api.get<Payment>(`/payments/${id}`),

  // POST http://localhost:5000/api/payments
  create: (data: CreatePaymentRequest) => 
    api.post<Payment>('/payments', data),

  // PUT http://localhost:5000/api/payments/:id
  update: (id: string, data: UpdatePaymentRequest) => 
    api.put<Payment>(`/payments/${id}`, data),

  // DELETE http://localhost:5000/api/payments/:id
  delete: (id: string) => 
    api.delete(`/payments/${id}`),
}; 