import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateProfileDto {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  getCurrentUser: () => api.get<User>('/users/me'),
  
  updateProfile: (data: UpdateProfileDto) => 
    api.put<User>('/users/me', data),
  
  updateAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post<User>('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  changePassword: (data: ChangePasswordDto) => 
    api.put('/users/me/password', data),
}; 