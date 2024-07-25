import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';

interface FeedState {
  orders: TOrder[];
  orderItem: TOrder | null;
  total: number | null;
  totalToday: number | null;
  error: string | null;
  loading: boolean;
}

const initialState: FeedState = {
  orders: [],
  orderItem: null,
  total: 0,
  totalToday: 0,
  error: null,
  loading: false
};

export const getFeed = createAsyncThunk('feed/getFeed', async () =>
  getFeedsApi()
);

export const getOrder = createAsyncThunk(
  'orders/getOrderDetails',
  async (number: number) => getOrderByNumberApi(number)
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Не удалось загрузить ленту заказов';
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload.orders[0];
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Не удалось загрузить информацию о заказе';
      });
  },
  selectors: {
    feedOrdersSelector: (state) => state.orders,
    feedOrderItemSelector: (state) => state.orderItem,
    feedTotalSelector: (state) => state.total,
    feedTotalTodaySelector: (state) => state.totalToday,
    feedErrorSelector: (state) => state.error
  }
});

export default feedSlice.reducer;
export const {
  feedOrdersSelector,
  feedTotalSelector,
  feedTotalTodaySelector,
  feedErrorSelector,
  feedOrderItemSelector
} = feedSlice.selectors;
