import api from './api';

export interface Activity {
  id: string;
  type: 'call' | 'meeting' | 'email' | 'task' | 'note';
  subject: string;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  relatedTo: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateActivityRequest = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateActivityRequest = Partial<CreateActivityRequest>;

export const activityService = {
  getAll: () => api.get<Activity[]>('/activities'),
  getById: (id: string) => api.get<Activity>(`/activities/${id}`),
  create: (data: CreateActivityRequest) => api.post<Activity>('/activities', data),
  update: (id: string, data: UpdateActivityRequest) => api.put<Activity>(`/activities/${id}`, data),
  delete: (id: string) => api.delete(`/activities/${id}`),
}; 