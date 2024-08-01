import reducer, { createOrder, clearOrder } from './orderSlice';

jest.mock('../utils/burger-api');

describe('срез заказа', () => {
  const initialState = {
    order: null,
    error: null,
    loading: false
  };

  const mockOrder = {
    _id: '1',
    status: 'готов',
    name: 'Бургер',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 123,
    ingredients: ['Булка', 'Начинка']
  };

  it('должен обрабатывать начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('очистка заказа', () => {
    it('должен очищать заказ', () => {
      const state = {
        order: mockOrder,
        error: null,
        loading: false
      };
      const action = clearOrder();
      const newState = reducer(state, action);
      expect(newState.order).toBe(null);
      expect(newState.loading).toBe(false);
    });
  });

  describe('создание заказа', () => {
    it('должен обрабатывать состояние pending', () => {
      const action = { type: createOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('должен обрабатывать состояние fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: { order: mockOrder }
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.order).toEqual(mockOrder);
    });

    it('должен обрабатывать состояние rejected', () => {
      const action = {
        type: createOrder.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = reducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });
});
