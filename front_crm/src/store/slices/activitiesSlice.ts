import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  activityService, 
  Activity, 
  CreateActivityRequest, 
  UpdateActivityRequest 
} from '../../services/activityService';

interface ActivitiesState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivitiesState = {
  activities: [],
  loading: false,
  error: null,
};

export const fetchActivities = createAsyncThunk(
  'activities/fetchAll',
  async () => {
    const response = await activityService.getAll();
    return response.data;
  }
);

export const createActivity = createAsyncThunk(
  'activities/create',
  async (activity: CreateActivityRequest) => {
    const response = await activityService.create(activity);
    return response.data;
  }
);

export const updateActivity = createAsyncThunk(
  'activities/update',
  async ({ id, data }: { id: string; data: UpdateActivityRequest }) => {
    const response = await activityService.update(id, data);
    return response.data;
  }
);

export const deleteActivity = createAsyncThunk(
  'activities/delete',
  async (id: string) => {
    await activityService.delete(id);
    return id;
  }
);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch activities';
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.activities.push(action.payload);
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        const index = state.activities.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.activities = state.activities.filter(a => a.id !== action.payload);
      });
  },
});

export default activitiesSlice.reducer; 