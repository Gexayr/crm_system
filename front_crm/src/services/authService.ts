import axios from 'axios';
import { LoginCredentials } from '../types/auth';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data.data;
    } catch (error: any) {
      throw error;
    }
  },
}; 