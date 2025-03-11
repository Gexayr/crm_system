import api from './api';

export interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  totalActivities: number;
  pendingActivities: number;
}

export interface RecentActivity {
  id: number;
  type: string;
  subject: string;
  date: string;
}

export interface CustomerStats {
  newCustomers: number;
  customerGrowth: number;
  customersByStatus: {
    active: number;
    inactive: number;
    pending: number;
  };
}

export const dashboardService = {
  getStats: () => api.get<DashboardStats>('/dashboard/stats'),
  
  getRecentActivities: () => 
    api.get<RecentActivity[]>('/dashboard/recent-activities'),
  
  getCustomerStats: () => api.get<CustomerStats>('/dashboard/customer-stats'),
}; 