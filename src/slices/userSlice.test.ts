import userReducer, {
  userLogin,
  userRegister,
  userLogout,
  getUser,
  updateUser,
  getUserOrders
} from './userSlice';

describe('userSlice', () => {
  const initialState = {
    user: null,
    orders: [],
    isAuthChecked: false,
    loading: false,
    error: null
  };

  const mockUser = {
    email: 'test@test.com',
    name: 'test user'
  };

  const mockOrders = [
    { id: '1', items: [] },
    { id: '2', items: [] }
  ];

  it('должен обрабатывать начальное состояние', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('вход пользователя', () => {
    it('должен обрабатывать состояние pending', () => {
      const action = { type: userLogin.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обрабатывать состояние fulfilled', () => {
      const action = {
        type: userLogin.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен обрабатывать состояние rejected', () => {
      const action = {
        type: userLogin.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('регистрация пользователя', () => {
    it('должен обрабатывать состояние pending', () => {
      const action = { type: userRegister.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен обрабатывать состояние fulfilled', () => {
      const action = {
        type: userRegister.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it('должен обрабатывать состояние rejected', () => {
      const action = {
        type: userRegister.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка');
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe('выход пользователя', () => {
    it('должен обрабатывать состояние pending', () => {
      const action = { type: userLogout.pending.type };
      const state = userReducer(
        { ...initialState, user: mockUser, isAuthChecked: true },
        action
      );
      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.isAuthChecked).toBe(false);
    });
  });

  describe('получение заказов пользователя', () => {
    it('должен обрабатывать состояние pending', () => {
      const action = { type: getUserOrders.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен обрабатывать состояние fulfilled', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
    });

    it('должен обрабатывать состояние rejected', () => {
      const action = {
        type: getUserOrders.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('получение пользователя', () => {
    it('должен обрабатывать состояние ожидания', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен обрабатывать выполненное состояние', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it('должен обрабатывать отклоненное состояние', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('обновление пользователя', () => {
    it('должен обрабатывать состояние ожидания', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен обрабатывать выполненное состояние', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: { ...mockUser, name: 'Обновленный пользователь' } }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual({
        ...mockUser,
        name: 'Обновленный пользователь'
      });
    });

    it('должен обрабатывать отклоненное состояние', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = userReducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });
});
