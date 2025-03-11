import api from './api';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  // Remove avatar if it's not in the backend response
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export const profileService = {
  // GET http://localhost:5000/api/auth/profile
  getProfile: async () => {
    const response = await api.get<ApiResponse<Profile>>('/auth/profile');
    return response.data;
  },

  // PUT http://localhost:5000/api/auth/profile
  updateProfile: async (data: UpdateProfileRequest) => {
    const response = await api.put<ApiResponse<Profile>>('/auth/profile', data);
    return response.data;
  },

  // PUT http://localhost:5000/api/auth/profile/password
  changePassword: async (data: ChangePasswordRequest) => {
    const response = await api.put<ApiResponse<{ message: string }>>('/auth/profile/password', data);
    return response.data;
  },

  // POST http://localhost:5000/api/users/profile/avatar
  updateAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post<ApiResponse<Profile>>('/users/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}; 