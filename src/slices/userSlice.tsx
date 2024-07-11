import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

interface UserState {
  user: TUser | null;
  orders: TOrder[];
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  orders: [],
  isAuthChecked: false,
  loading: false,
  error: null
};

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (getCookie('accessToken')) {
        await dispatch(getUser());
      }
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(authChecked());
    }
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const userRegister = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});

export const getUserOrders = createAsyncThunk('user/getUserOrders', async () =>
  getOrdersApi()
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Не удалось залогинить пользователя';
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Не удалось зарегистрировать пользователя';
        state.isAuthChecked = false;
        state.user = null;
      })
      .addCase(userLogout.pending, (state) => {
        state.user = null;
        state.loading = false;
        state.isAuthChecked = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ??
          'Не удалось загрузить список заказов пользователя';
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Не удалось получить данные пользователя';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Не удалось обновить данные пользователя';
      });
  },
  selectors: {
    userSelector: (state) => state.user,
    userAuthSelector: (state) => state.isAuthChecked,
    userOrdersSelector: (state) => state.orders,
    userLoadingSelector: (state) => state.loading,
    userErrorSelector: (state) => state.error
  }
});

export default userSlice.reducer;
export const { authChecked } = userSlice.actions;
export const {
  userSelector,
  userErrorSelector,
  userOrdersSelector,
  userLoadingSelector,
  userAuthSelector
} = userSlice.selectors;
