import api from './api';

export interface Settings {
  companyName: string;
  emailNotifications: boolean;
  language: string;
  timezone: string;
}

export const settingsService = {
  getSettings: () => api.get<Settings>('/settings'),
  
  updateSettings: (data: Partial<Settings>) => 
    api.put<Settings>('/settings', data),
}; 