import api from './api';
import { Customer } from './customerService';
import { Activity } from './activityService';

export interface SearchResults {
  customers: Customer[];
  activities: Activity[];
}

export const searchService = {
  searchAll: (query: string) => 
    api.get<SearchResults>(`/search?q=${query}`),
  
  searchCustomers: (query: string) => 
    api.get<Customer[]>(`/search/customers?q=${query}`),
  
  searchActivities: (query: string) => 
    api.get<Activity[]>(`/search/activities?q=${query}`),
}; 