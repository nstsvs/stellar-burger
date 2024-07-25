import store, { rootReducer } from './store';

describe('rootReducer', () => {
  test('должен инициализировать корректное начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const storeState = store.getState();
    expect(initialState).toEqual(storeState);
  });
});
