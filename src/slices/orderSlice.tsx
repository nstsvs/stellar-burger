import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  order: TOrder | null;
  error: string | null;
  loading: boolean;
}

const initialState: OrderState = {
  order: null,
  error: null,
  loading: false
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (data: string[]) => orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Неизвестная ошибка';
      });
  },
  selectors: {
    orderSelector: (state) => state.order,
    orderLoadingSelector: (state) => state.loading
  }
});

export default orderSlice.reducer;
export const { orderSelector, orderLoadingSelector } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
