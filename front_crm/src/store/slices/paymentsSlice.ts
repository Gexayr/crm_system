import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  paymentService, 
  Payment, 
  CreatePaymentRequest, 
  UpdatePaymentRequest 
} from '../../services/paymentService';

interface PaymentsState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentsState = {
  payments: [],
  loading: false,
  error: null,
};

export const fetchPayments = createAsyncThunk(
  'payments/fetchAll',
  async () => {
    const response = await paymentService.getAll();
    return response.data;
  }
);

export const createPayment = createAsyncThunk(
  'payments/create',
  async (payment: CreatePaymentRequest) => {
    const response = await paymentService.create(payment);
    return response.data;
  }
);

export const updatePayment = createAsyncThunk(
  'payments/update',
  async ({ id, data }: { id: string; data: UpdatePaymentRequest }) => {
    const response = await paymentService.update(id, data);
    return response.data;
  }
);

export const deletePayment = createAsyncThunk(
  'payments/delete',
  async (id: string) => {
    await paymentService.delete(id);
    return id;
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch payments';
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        const index = state.payments.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter(p => p.id !== action.payload);
      });
  },
});

export default paymentsSlice.reducer; 