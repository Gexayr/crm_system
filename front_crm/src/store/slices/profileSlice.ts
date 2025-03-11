import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileService, Profile, UpdateProfileRequest } from '../../services/profileService';

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async () => {
    const response = await profileService.getProfile();
    if (response.status !== 'success') {
      throw new Error('Failed to fetch profile');
    }
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (data: UpdateProfileRequest) => {
    const response = await profileService.updateProfile(data);
    if (response.status !== 'success') {
      throw new Error('Failed to update profile');
    }
    return response.data;
  }
);

export const updateAvatar = createAsyncThunk(
  'profile/updateAvatar',
  async (file: File) => {
    const response = await profileService.updateAvatar(file);
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default profileSlice.reducer; 