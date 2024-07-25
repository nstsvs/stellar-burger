import reducer, { getFeed, getOrder } from './feedSlice';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    orderItem: null,
    total: 0,
    totalToday: 0,
    error: null,
    loading: false
  };

  const mockOrders = [
    {
      _id: '1',
      status: 'готов',
      name: 'Бургер',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 123,
      ingredients: ['Булка', 'Начинка']
    }
  ];

  const mockFeedState = {
    orders: mockOrders,
    orderItem: mockOrders[0],
    total: 12,
    totalToday: 2,
    loading: false,
    error: null
  };

  it('должен обрабатывать начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('получение ленты заказов', () => {
    it('должен обрабатывать состояние pending', () => {
      const action = { type: getFeed.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен обрабатывать состояние fulfilled', () => {
      const action = {
        type: getFeed.fulfilled.type,
        payload: mockFeedState
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(12);
      expect(state.totalToday).toBe(2);
    });

    it('должен обрабатывать состояние rejected', () => {
      const action = {
        type: getFeed.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = reducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('получение заказа', () => {
    it('должен обрабатывать состояние pending', () => {
      const action = { type: getOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен обрабатывать состояние fulfilled', () => {
      const action = {
        type: getOrder.fulfilled.type,
        payload: { orders: [mockOrders[0]] }
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.orderItem).toEqual(mockOrders[0]);
    });

    it('должен обрабатывать состояние rejected', () => {
      const action = {
        type: getOrder.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = reducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });
});
