import { configureStore, Store } from '@reduxjs/toolkit';
import combineReducer from './RootReducer';
import { baseApi } from './BaseApi';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

const store: Store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    ...combineReducer,
  },
  middleware: (gdm) =>
    gdm({ serializableCheck: false }).concat(baseApi.middleware),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combineReducer>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
