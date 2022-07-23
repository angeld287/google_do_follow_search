import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSessionReducer from '../features/userSession/userSessionSlice';
import userRegisterReducer from '../features/userRegister/userRegisterSlice';
import userSearchSlice from '../features/googleSearch/searchSlice';
import pageSourceSlice from '../features/pageSource/pageSourceSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userSession: userSessionReducer,
    userRegister: userRegisterReducer,
    googleSearch: userSearchSlice,
    pageSource: pageSourceSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
