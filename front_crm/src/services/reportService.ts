import api from './api';

export interface ReportParams {
  startDate: string;
  endDate: string;
}

export interface ActivityReport {
  totalActivities: number;
  activitiesByType: Record<string, number>;
  activitiesByStatus: Record<string, number>;
}

export interface CustomerReport {
  totalCustomers: number;
  newCustomers: number;
  customersByStatus: Record<string, number>;
}

export interface PerformanceReport {
  completedActivities: number;
  conversionRate: number;
  averageResponseTime: number;
}

export const reportService = {
  getActivityReport: (params: ReportParams) => 
    api.get<ActivityReport>('/reports/activities', { params }),
  
  getCustomerReport: (params: ReportParams) => 
    api.get<CustomerReport>('/reports/customers', { params }),
  
  getPerformanceReport: (params: ReportParams) => 
    api.get<PerformanceReport>('/reports/performance', { params }),
}; 