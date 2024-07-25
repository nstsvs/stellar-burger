import reducer, { getIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    loading: false
  };

  const mockIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  it('должен обрабатывать начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('получение ингредиентов', () => {
    it('должен обрабатывать состояние pending', () => {
      const action = { type: getIngredients.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('должен обрабатывать состояние fulfilled', () => {
      const action = {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockIngredients);
      expect(action.payload).toEqual(mockIngredients);
    });

    it('должен обрабатывать состояние rejected', () => {
      const action = { type: getIngredients.rejected.type };
      const state = reducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
    });
  });
});
